import { type ChartConfig } from "@/components/ui/chart";
import { cn } from "@/lib/utils";
import AllocationAreaChart from "./AllocationAreaChart";

export const description = "A linear area chart";

const chartData = [
  { day: "Mon", value: 234000 },
  { day: "Tue", value: 335500 },
  { day: "Wed", value: 736200 },
  { day: "Thu", value: 238800 },
  { day: "Fri", value: 237000 },
  { day: "Sat", value: 637400 },
  { day: "Sun", value: 297827.95 },
];

const chartConfig = {
  desktop: {
    label: "value",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

const startingBalance = 236903.03;
const endingBalance = 237827.95;
const gainPercent = 0.39;

export function AllocationA() {
  return (
    <section className="section-container">
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-bold">
          Allocation (<span className="text-[#1C54FF]">A</span>)
        </h3>
        <div className="text-right">
          <p className="font-semibold">
            $
            {endingBalance.toLocaleString(undefined, {
              maximumFractionDigits: 0,
            })}
            M
          </p>
          <div
            className={cn(
              "text-[10px]",
              gainPercent >= 0 ? "text-[#12BE73]" : "text-[#FF3F31]"
            )}
          >
            ▲ {gainPercent.toFixed(2)}%
          </div>
        </div>
      </div>

      <div className="flex justify-between mb-4">
        <div>
          <p className="text-foreground/70 text-xs">Starting</p>
          <p className="font-semibold text-sm">
            $
            {startingBalance.toLocaleString(undefined, {
              maximumFractionDigits: 0,
            })}
          </p>
        </div>
        <div>
          <p className="text-foreground/70 text-xs">Ending</p>
          <p className="font-semibold text-sm">
            $
            {endingBalance.toLocaleString(undefined, {
              maximumFractionDigits: 0,
            })}
          </p>
        </div>
      </div>

      <AllocationAreaChart chartData={chartData} chartConfig={chartConfig} />
    </section>
  );
}
