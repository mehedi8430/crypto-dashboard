/* eslint-disable @typescript-eslint/no-explicit-any */
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from "recharts";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
} from "@/components/ui/chart";
import { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { database } from '@/Firebase/Firebase'; // Your Firebase config

const chartConfig = {
  total_nav: {
    label: "Total Nav",
    color: "var(--color-chart-1)",
  },
} satisfies ChartConfig;

export default function TotalNavChart() {
  const [chartData, setChartData] = useState<any[]>([]);
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(1000);
  const [dynamicTicks, setDynamicTicks] = useState<number[]>([]);

  useEffect(() => {
    const vaultReportsRef = ref(database, 'vaultReports');

    onValue(vaultReportsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const reports = Object.values(data) as any[];
        if (reports.length > 0) {
          const latestReport = reports[reports.length - 1];
          const navChartData = latestReport.nav.chartData.map((d: any) => ({ ...d, total_nav: d.nav }));
          setChartData(navChartData);

          const values = navChartData.map((d: any) => d.total_nav);
          const dataMin = Math.min(...values);
          const dataMax = Math.max(...values);

          const padding = (dataMax - dataMin) * 0.1;
          const newMinValue = Math.floor(dataMin - padding);
          const newMaxValue = Math.ceil(dataMax + padding);
          setMinValue(newMinValue);
          setMaxValue(newMaxValue);

          const tickCount = 5;
          const tickStep = (newMaxValue - newMinValue) / (tickCount - 1);
          const newDynamicTicks = Array.from({ length: tickCount }, (_, i) =>
            Math.round(newMinValue + tickStep * i)
          );
          setDynamicTicks(newDynamicTicks);
        }
      }
    }, (error) => {
      console.error('Error fetching vaultReports:', error);
    });

    return () => {
      onValue(vaultReportsRef, () => { }); // Detach listener
    };
  }, []);


  const CustomTooltipCursor = (props: any) => {
    const { points, height, payload } = props;

    if (points && points.length > 0) {
      const { x } = points[0];
      const value = payload[0]?.value;

      const normalizedValue = (value - minValue) / (maxValue - minValue);
      const yPosition = height - normalizedValue * height;

      return (
        <g>
          <line
            x1={x}
            y1={yPosition}
            x2={x}
            y2={height}
            stroke="var(--color-chart-1)"
            strokeWidth={3}
            strokeDasharray="5 3"
            opacity={0.7}
          />
          <circle
            cx={x}
            cy={yPosition}
            r={8}
            fill="var(--color-chart-1)"
            stroke="var(--color-chart-1)"
            strokeWidth={3}
            opacity={1}
            filter="drop-shadow(0 0 6px var(--color-chart-1))"
          />
          <circle cx={x} cy={yPosition} r={4} fill="white" opacity={1} />
        </g>
      );
    }
    return null;
  };

  const CustomTooltipContent = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-border px-4 py-2 rounded-lg shadow-lg">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary" />
            <span className="text-sm font-bold text-foreground">
              ${payload[0].value}
            </span>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <div className="w-2 h-2 rounded-full bg-foreground" />
            <span className="text-[10px] text-foreground/70">
              {new Date(label).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}{" "}
              {payload[0].payload.time.split('.')[0]},{" "}
              {new Date(label).getFullYear()}
            </span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <ChartContainer
      config={chartConfig}
      className="aspect-auto h-[230px] w-full"
      style={{ pointerEvents: "all" }}
    >
      <ResponsiveContainer>
        <AreaChart
          accessibilityLayer
          data={chartData}
          margin={{
            left: 12,
            right: 12,
          }}
        >
          <defs>
            <linearGradient id="fillTotalNav" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor="var(--color-chart-1)"
                stopOpacity={0.5}
              />
              <stop
                offset="95%"
                stopColor="var(--color-chart-1)"
                stopOpacity={0.1}
              />
            </linearGradient>
          </defs>

          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="date"
            tickLine={false}
            interval="preserveStartEnd"
            tickMargin={8}
            height={40}
            tickFormatter={(value) => {
              const date = new Date(value);
              return date.toLocaleDateString('en-US', {
                month: '2-digit',
                day: '2-digit',
                year: '2-digit'
              });
            }}
            axisLine={false}
          />
          <YAxis
            ticks={dynamicTicks}
            domain={[minValue, maxValue]}
            axisLine={false}
            tickLine={false}
            tick={{ fill: "var(--color-chart-1-foreground)" }}
            tickMargin={5}
            tickFormatter={(value) => `$${value.toFixed(1)}`}
          />
          <ChartTooltip
            content={<CustomTooltipContent />}
            cursor={<CustomTooltipCursor />}
          />
          <Area
            dataKey="total_nav"
            type="monotone"
            fill="url(#fillTotalNav)"
            fillOpacity={0.4}
            stroke="var(--color-chart-1)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}