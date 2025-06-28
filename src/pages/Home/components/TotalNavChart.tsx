import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { date: "Mon", total_nav: 810 },
  { date: "Tue", total_nav: 820 },
  { date: "Wed", total_nav: 835 },
  { date: "Thu", total_nav: 825 },
  { date: "Fri", total_nav: 825 },
  { date: "Sat", total_nav: 820 },
  { date: "Sun", total_nav: 810 },
  { date: "Mon", total_nav: 830 },
];

const chartConfig = {
  total_nav: {
    label: "Total Nav",
    color: "var(--color-chart-1)",
  },
} satisfies ChartConfig;

export default function TotalNavChart() {
  const CustomTooltipCursor = (props) => {
    const { points } = props;
    if (points && points.length > 0) {
      const { x, y } = points[0]; // Get coordinates of the active point
      return (
        <line
          x1={x}
          y1={0} // Start from top of chart
          x2={x}
          y2={props.height} // Go to bottom of chart (or just to y if you want it dynamic)
          stroke="var(--color-chart-1)" // Your green color
          strokeWidth={3}
          strokeDasharray="5 3" // Dashed line
          opacity={1}
        />
      );
    }
    return null;
  };

  return (
    <ChartContainer
      config={chartConfig}
      className="aspect-auto h-[230px] w-full mt-6"
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
          ticks={[800, 810, 820, 830, 840]}
          domain={[800, 840]}
          axisLine={false}
          tickLine={false}
          tick={{ fill: "var(--color-chart-1-foreground)" }}
          tickMargin={15}
          tickFormatter={(value) => `$${value.toFixed(1)}`}
        />
        <ChartTooltip
          content={<ChartTooltipContent indicator="dot" />}
          // cursor={{
          //   stroke: "var(--color-chart-1)",
          //   strokeWidth: 3,
          //   strokeDasharray: "5 3",
          //   opacity: 1,
          // }}
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
