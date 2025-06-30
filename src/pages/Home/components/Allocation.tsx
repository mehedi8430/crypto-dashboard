import { cn } from "@/lib/utils";
import AllocationAreaChart from "./AllocationAreaChart";
import { type ChartConfig } from "@/components/ui/chart";

type AllocationProps = {
  label: string;
  startingBalance: number;
  endingBalance: number;
  gainPercent: number;
  chartData: { day: string; value: number }[];
  chartConfig: ChartConfig;
};

export default function Allocation({
  label,
  startingBalance,
  endingBalance,
  gainPercent,
  chartData,
  chartConfig,
}: AllocationProps) {
  return (
    <section className="section-container-no-padding border rounded-md hover:border hover:border-primary">
      <div className="flex items-start justify-between px-6 pt-6">
        <h3 className="font-bold">
          Allocation (
          <span
            className="font-bold"
            style={{ color: chartConfig.desktop.color }}
          >
            {label}
          </span>
          )
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
            {gainPercent >= 0 ? "▲" : "▼"} {gainPercent.toFixed(2)}%
          </div>
        </div>
      </div>

      <div className="flex items-center gap-8 px-6 py-2">
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

      <AllocationAreaChart
        chartData={chartData}
        chartConfig={chartConfig}
        idSuffix={label}
      />
    </section>
  );
}
