import { ChartContainer, type ChartConfig } from "@/components/ui/chart";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

export default function AllocationAreaChart({
  chartData,
  chartConfig,
  idSuffix,
}: {
  chartData: { day: string; value: number }[];
  chartConfig: ChartConfig;
  idSuffix: string;
}) {
  const gradientId = `fillAllocation${idSuffix}`;

  return (
    <ChartContainer config={chartConfig}>
      <AreaChart
        accessibilityLayer
        data={chartData}
        margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor={chartConfig.desktop.color}
              stopOpacity={0.4}
            />
            <stop
              offset="95%"
              stopColor={chartConfig.desktop.color}
              stopOpacity={0.1}
            />
          </linearGradient>
        </defs>
        <XAxis dataKey="day" hide />
        <CartesianGrid vertical={false} horizontal={false} />
        <Area
          type="monotone"
          dataKey="value"
          stroke={chartConfig.desktop.color}
          fill={`url(#${gradientId})`}
          fillOpacity={0.4}
          activeDot={false}
        />
      </AreaChart>
    </ChartContainer>
  );
}
