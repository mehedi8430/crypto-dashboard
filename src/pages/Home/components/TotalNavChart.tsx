import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { date: "2025-03-17", total_nav: 800 },
  { date: "2025-03-18", total_nav: 810 },
  { date: "2025-03-19", total_nav: 820 },
  { date: "2025-03-20", total_nav: 830 },
  { date: "2025-03-21", total_nav: 840 },
  { date: "2025-03-22", total_nav: 850 },
  { date: "2025-03-23", total_nav: 860 },
  { date: "2025-03-24", total_nav: 870 },
];

const chartConfig = {
  total_nav: {
    label: "Total Nav",
    color: "var(--color-chart-1)",
  },
} satisfies ChartConfig;

export default function TotalNavChart() {
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full mt-6">
      <AreaChart
        accessibilityLayer
        data={chartData}
        margin={{
          left: 12,
          right: 12,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="date"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => {
            const date = new Date(value);
            return date.toLocaleDateString("en-US", { weekday: "short" });
          }}
        />
        <YAxis
          ticks={[800, 810, 820, 830, 840, 850, 860, 870]}
          domain={[800, 870]}
          axisLine={false}
          tickLine={false}
          tick={{ fill: "var(--color-chart-1-foreground)" }}
          tickFormatter={(value) => `$${value.toFixed(1)}`}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="dot" />}
        />
        <Area
          dataKey="total_nav"
          type="monotone"
          fill="var(--color-chart-1)"
          fillOpacity={0.4}
          stroke="var(--color-chart-1)"
        />
      </AreaChart>
    </ChartContainer>
  );
}
