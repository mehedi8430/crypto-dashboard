import { ChartContainer, type ChartConfig } from "@/components/ui/chart";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

export default function AllocationAreaChart({
  chartData,
  chartConfig,
  chartColor = "var(--color-chart-1)",
}: {
  chartData: { day: string; value: number }[];
  chartConfig: ChartConfig;
  chartColor?: string;
}) {
  return (
    <ChartContainer config={chartConfig}>
      <AreaChart
        accessibilityLayer
        data={chartData}
        margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="fillAllocationA" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={chartColor} stopOpacity={0.4} />
            <stop offset="95%" stopColor={chartColor} stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="day" hide />
        <CartesianGrid vertical={false} horizontal={false} />
        <Area
          type="monotone"
          dataKey="value"
          stroke={chartColor}
          fill="url(#fillAllocationA)"
          fillOpacity={0.4}
          activeDot={false}
        />
      </AreaChart>
    </ChartContainer>
  );
}
