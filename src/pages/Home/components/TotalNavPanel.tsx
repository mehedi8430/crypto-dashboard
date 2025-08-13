import SelectInput, { type SelectOption } from "@/components/SelectInput";
import TotalNavChart from "./TotalNavChart";
import { useState } from "react";
import type { TNavChartData } from "@/types";
import { cn } from "@/lib/utils";
import { useCryptoChartData } from "@/pages/hooks";

const monthOptions: SelectOption[] = [
  { value: "january", label: "January" },
  { value: "february", label: "February" },
  { value: "march", label: "March" },
  { value: "april", label: "April" },
  { value: "may", label: "May" },
  { value: "june", label: "June" },
  { value: "july", label: "July" },
  { value: "august", label: "August" },
  { value: "september", label: "September" },
  { value: "october", label: "October" },
  { value: "november", label: "November" },
  { value: "december", label: "December" },
];

export default function TotalNavPanel() {
  const currentMonth = new Date().toLocaleString("default", { month: "long" });
  const [selected, setSelected] = useState<string>(currentMonth.toLowerCase());

  const {
    data: navChartData,
    // loading: navLoading,
    // error: navError,
    // isConnected: navConnected,
  } = useCryptoChartData("http://172.16.100.26:5050");
  console.log({ navChartData });

  const totalNav =
    navChartData &&
    navChartData.reduce((total: number, item: TNavChartData) => {
      return total + item.endingNav;
    }, 0);

  const totalGrowth =
    navChartData &&
    navChartData.reduce((total: number, item: TNavChartData) => {
      return total + item.growthPercent;
    }, 0);

  const isUp = totalGrowth ? totalGrowth > 0 : true;

  const handleMonthChange = (value: string) => {
    console.log("Selected month:", value);
    setSelected(value);
  };

  return (
    <section className="section-container p-0 h-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 p-6">
        <h3>
          Total NAV
          <p className="text-foreground text-[16px] font-bold ml-1">
            {totalNav?.toFixed(2) || 1400000}
          </p>
        </h3>

        <div className="flex flex-wrap items-center gap-4 md:gap-5">
          <div className="flex flex-col items-center gap-1">
            <p
              className={cn("text-xs", {
                "text-green-500": isUp,
                "text-red-500": !isUp,
              })}
            >
              {isUp ? "+" : "-"}
              {totalGrowth?.toFixed(2) || 0}%
            </p>
            <p className="text-foreground/70 text-[10px]">Total growth</p>
          </div>

          <SelectInput
            options={monthOptions}
            placeholder="Select a month"
            label="Month"
            value={selected}
            onValueChange={handleMonthChange}
          />
        </div>
      </div>

      {/* Chart */}
      <div className="pr-6">
        <TotalNavChart />
      </div>
    </section>
  );
}
