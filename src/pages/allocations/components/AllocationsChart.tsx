import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 }
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

export default function AllocationsChart({ allocation }: { allocation: 'a' | 'b' | 'c' | null }) {
  console.log(allocation);
  if (allocation === null) return;

  return (
    <>
      <section className="section-container">
        <div>
          <h2 className="font-bold">Performance Trends</h2>
          <p className="text-muted-foreground">Showing total performance for the last 30-day</p>
        </div>

        <div>
          <ChartContainer config={chartConfig} className="w-full h-[15rem]">
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
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line" />}
              />
              <Area
                dataKey="desktop"
                type="natural"
                fill="var(--color-desktop)"
                fillOpacity={0.4}
                stroke="var(--color-desktop)"
              />
            </AreaChart>
          </ChartContainer>
        </div>

        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 leading-none font-medium">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="text-muted-foreground flex items-center gap-2 leading-none">
              January - June 2024
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
