import SelectInput, { type SelectOption } from "@/components/SelectInput";
import TotalNavChart from "./TotalNavChart";
import { useState } from "react";
import { useNavHistoryData } from "@/queries/cryptoQueries";
import Loader from "@/components/Loader";
import type { TNavChartData } from "@/types";
import { cn } from "@/lib/utils";

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
    isPending,
    error,
  } = useNavHistoryData({
    days: "30",
  });

  const totalNav = navChartData?.data.reduce(
    (total: number, item: TNavChartData) => {
      return total + item.endingNav;
    },
    0
  );

  const totalGrowth = navChartData?.data.reduce(
    (total: number, item: TNavChartData) => {
      return total + item.growthPercent;
    },
    0
  );

  const isUp = totalGrowth > 0;

  const handleMonthChange = (value: string) => {
    console.log("Selected month:", value);
    setSelected(value);
  };

  if (isPending) return <Loader />;
  if (error) return <div>Error loading chart data: {error.message}</div>;
  if (!navChartData || navChartData.length === 0)
    return <div>No chart data available</div>;

  return (
    <section className="section-container p-0">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 p-6">
        <h3>
          Total NAV
          <p className="text-foreground text-[16px] font-bold ml-1">
            {`$${totalNav?.toFixed(2)}`}
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
              {`${totalGrowth?.toFixed(2)}%`}
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
