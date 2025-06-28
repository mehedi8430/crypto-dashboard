"use client";

import { Pie, PieChart, Cell } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import type { ChartConfig } from "@/components/ui/chart";

// This component is now self-contained and only responsible for the chart.
// Note that we don't need to import 'Allocation' type here anymore as chartData is passed via props.
interface AllocationChartProps {
  data: {
    name: string;
    value: number;
    fill: string;
  }[];
}

const chartConfig = {
  value: {
    label: "Value",
  },
} satisfies ChartConfig;

export default function AllocationChart({ data }: AllocationChartProps) {
  return (
    <div className="relative flex items-center justify-center">
      <ChartContainer
        config={chartConfig}
        className="mx-auto aspect-square h-[200px]"
      >
        <PieChart width={200} height={200}>
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={0}
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Pie>
        </PieChart>
      </ChartContainer>
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <p className="text-lg font-medium">Audit 90%</p>
        <p className="text-lg font-medium">PAC</p>
      </div>
    </div>
  );
}