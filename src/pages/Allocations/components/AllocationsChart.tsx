/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { database } from "@/Firebase/Firebase";

const allocationColors = {
  a: "#0867ED", // Blue
  b: "#00CA72", // Green
  c: "#F2C916", // Yellow
};

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ value: number; payload: { date: string } }>;
  label?: string;
  color?: string;
}

const CustomTooltip = ({ active, payload, label, color }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background/80 backdrop-blur-sm p-3 border border-border rounded-lg shadow-xl">
        <p className="text-sm font-bold text-foreground">{new Date(label ?? "").toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
        <p className="text-sm" style={{ color: color || "var(--chart-blue)" }}>
          Performance:{" "}
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          }).format(payload[0].value)}
        </p>
      </div>
    );
  }
  return null;
};

export default function AllocationsChart({ allocation }: { allocation: "a" | "b" | "c" | null }) {
    const [chartData, setChartData] = useState<any[]>([]);
    const [minValue, setMinValue] = useState(0);
    const [maxValue, setMaxValue] = useState(1000);

    useEffect(() => {
        if (!allocation) return;

        const vaultReportsRef = ref(database, 'vaultReports');

        onValue(vaultReportsRef, (snapshot) => {
          const data = snapshot.val();
          if (data) {
            const reports = Object.values(data) as any[];
            if (reports.length > 0) {
              const latestReport = reports[reports.length - 1];
              const allocationChartData = latestReport.allocations[allocation.toUpperCase()]?.chartData.map((d: any) => ({...d, performance: d.balance}));
              if (allocationChartData) {
                setChartData(allocationChartData);

                const values = allocationChartData.map((d: any) => d.performance);
                const dataMin = Math.min(...values);
                const dataMax = Math.max(...values);

                const padding = (dataMax - dataMin) * 0.1;
                const newMinValue = Math.floor(dataMin - padding);
                const newMaxValue = Math.ceil(dataMax + padding);
                setMinValue(newMinValue);
                setMaxValue(newMaxValue);
              }
            }
          }
        }, (error) => {
          console.error('Error fetching vaultReports:', error);
        });

        return () => {
          onValue(vaultReportsRef, () => {}); // Detach listener
        };
      }, [allocation]);


  if (!allocation) {
    return null; // Or a fallback UI
  }

  const chartColor = allocationColors[allocation];
  const gradientId = `fillPerformance-${allocation}`;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>30-day performance Trends</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full h-[250px] md:h-[300px]">
          <ResponsiveContainer width="100%" height="100%" >
            <AreaChart
              data={chartData}
              margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
            >
              <defs>
                <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={chartColor} stopOpacity={0.4} />
                  <stop offset="95%" stopColor={chartColor} stopOpacity={0.1} />
                </linearGradient>
              </defs>

              <CartesianGrid
                vertical={false}
                stroke="var(--border)"
                strokeOpacity={0.5}
              />

              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={10}
                tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                tick={{ fill: "var(--muted-foreground)" }}
                // Responsive ticks
                interval="preserveStartEnd"
                minTickGap={40}
              />

              <YAxis
                domain={[minValue, maxValue]}
                axisLine={false}
                tickLine={false}
                tickMargin={10}
                tick={{ fill: "var(--muted-foreground)" }}
                tickFormatter={(value) =>
                  new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                    notation: "compact",
                    compactDisplay: "short",
                  }).format(value)
                }
              />

              <Tooltip
                cursor={{
                  stroke: chartColor,
                  strokeWidth: 1,
                  strokeOpacity: 0.5,
                  strokeDasharray: "5 3",
                }}
                content={<CustomTooltip color={chartColor} />}
              />

              <Area
                type="monotone"
                dataKey="performance"
                stroke={chartColor}
                strokeWidth={2}
                fill={`url(#${gradientId})`}
                activeDot={{
                  r: 6,
                  fill: chartColor,
                  stroke: "var(--card)",
                  strokeWidth: 2,
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}