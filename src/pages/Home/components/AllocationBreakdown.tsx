import type { Allocation } from "@/types/allocation.type";
import AllocationChart from "./AllocationChart";
import SelectInput, { type SelectOption } from "@/components/SelectInput";

// Colors and data remain here, to be passed to the children components
const aColor = "#FFC107";
const bColor = "#007BFF";
const cColor = "#28A745";

const chartData: Allocation[] = [
  { name: "A", value: 41.5, fill: aColor },
  { name: "B", value: 35.1, fill: bColor },
  { name: "C", value: 26.5, fill: cColor },
];

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

export default function AllocationBreakdown() {
  const handleMonthChange = (value: string) => {
    console.log("Selected month:", value);
  };

  return (
    <section className="section-container h-full">
      <div className="flex items-center justify-between">
        <h3 className="font-bold">Allocation Breakdown</h3>

        <SelectInput
          options={monthOptions}
          placeholder="Select a month"
          label="Month"
          defaultValue="january"
          onValueChange={handleMonthChange}
        />
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="flex flex-col gap-4 mb-4 md:mb-0">
          {chartData.map((item) => (
            <div key={item.name} className="flex items-center gap-4">
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: item.fill }}
              />
              <div className="text-xl font-medium">{item.name}</div>
              <div className="text-xl font-medium">{item.value}%</div>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-8">
          <AllocationChart data={chartData} />

          <p className="font-bold md:max-w-[80px] text-start">Audit 90% PAC</p>
        </div>
      </div>
    </section>
  );
}
