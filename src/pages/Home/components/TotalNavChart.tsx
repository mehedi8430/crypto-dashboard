import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
} from "@/components/ui/chart";

const chartData = [
  { date: "Mon", total_nav: 822 },
  { date: "Tue", total_nav: 820 },
  { date: "Wed", total_nav: 835 },
  { date: "Thu", total_nav: 825 },
  { date: "Fri", total_nav: 825 },
  { date: "Sat", total_nav: 820 },
  { date: "Sun", total_nav: 814 },
  { date: "Mon", total_nav: 830 },
];

const chartConfig = {
  total_nav: {
    label: "Total Nav",
    color: "var(--color-chart-1)",
  },
} satisfies ChartConfig;

export default function TotalNavChart() {
  const values = chartData.map((d) => d.total_nav);
  const dataMin = Math.min(...values);
  const dataMax = Math.max(...values);

  const padding = (dataMax - dataMin) * 0.1; // 10% padding
  const minValue = Math.floor(dataMin - padding);
  const maxValue = Math.ceil(dataMax + padding);

  // Generate dynamic ticks
  const tickCount = 5;
  const tickStep = (maxValue - minValue) / (tickCount - 1);
  const dynamicTicks = Array.from({ length: tickCount }, (_, i) =>
    Math.round(minValue + tickStep * i)
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const CustomTooltipCursor = (props: any) => {
    const { points, height, payload } = props;

    if (points && points.length > 0) {
      const { x } = points[0];
      const value = payload[0]?.value;

      // Calculate the y position based on the actual chart scaling
      const normalizedValue = (value - minValue) / (maxValue - minValue);
      const yPosition = height - normalizedValue * height;

      return (
        <g>
          {/* Vertical cursor line */}
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

          {/* Active point circle with glow effect */}
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

          {/* Inner circle for contrast */}
          <circle cx={x} cy={yPosition} r={4} fill="white" opacity={1} />
        </g>
      );
    }
    return null;
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
              {label} {new Date().getFullYear()}
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
      className="aspect-auto h-[230px] w-full mt-6"
      style={{ pointerEvents: "all" }}
    >
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
              stopOpacity={0}
            />
          </linearGradient>
        </defs>

        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="date"
          tickLine={false}
          interval={0}
          tickMargin={15}
          height={40}
          tickFormatter={(value) => value.slice(0, 3)}
          axisLine={false}
        />
        <YAxis
          ticks={dynamicTicks}
          domain={[minValue, maxValue]}
          axisLine={false}
          tickLine={false}
          tick={{ fill: "var(--color-chart-1-foreground)" }}
          tickMargin={15}
          tickFormatter={(value) => `$${value.toFixed(1)}`}
        />
        <ChartTooltip
          // content={<ChartTooltipContent indicator="dot" />}
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
    </ChartContainer>
  );
}
