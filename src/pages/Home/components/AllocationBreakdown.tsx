import type { Allocation } from "@/types/allocation.type";
import SelectInput, { type SelectOption } from "@/components/SelectInput";
import AllocationPieChart from "./AllocationPieChart";
import { useState } from "react";

// Colors for consistency
const aColor = "#FFC107";
const bColor = "#007BFF";
const cColor = "#28A745";

// Monthly allocation data
const monthlyData: Record<string, Allocation[]> = {
  january: [
    { name: "A", value: 41.5, fill: aColor },
    { name: "B", value: 35.1, fill: bColor },
    { name: "C", value: 23.4, fill: cColor },
  ],
  february: [
    { name: "A", value: 48.2, fill: aColor },
    { name: "B", value: 27.8, fill: bColor },
    { name: "C", value: 28.0, fill: cColor },
  ],
  march: [
    { name: "A", value: 42.7, fill: aColor },
    { name: "B", value: 34.3, fill: bColor },
    { name: "C", value: 53.0, fill: cColor },
  ],
  april: [
    { name: "A", value: 40.1, fill: aColor },
    { name: "B", value: 36.5, fill: bColor },
    { name: "C", value: 23.4, fill: cColor },
  ],
  may: [
    { name: "A", value: 39.8, fill: aColor },
    { name: "B", value: 35.9, fill: bColor },
    { name: "C", value: 24.3, fill: cColor },
  ],
  june: [
    { name: "A", value: 41.0, fill: aColor },
    { name: "B", value: 34.7, fill: bColor },
    { name: "C", value: 24.3, fill: cColor },
  ],
  july: [
    { name: "A", value: 40.5, fill: aColor },
    { name: "B", value: 36.1, fill: bColor },
    { name: "C", value: 23.4, fill: cColor },
  ],
  august: [
    { name: "A", value: 52.0, fill: aColor },
    { name: "B", value: 44.9, fill: bColor },
    { name: "C", value: 13.1, fill: cColor },
  ],
  september: [
    { name: "A", value: 41.3, fill: aColor },
    { name: "B", value: 35.4, fill: bColor },
    { name: "C", value: 23.3, fill: cColor },
  ],
  october: [
    { name: "A", value: 40.8, fill: aColor },
    { name: "B", value: 36.2, fill: bColor },
    { name: "C", value: 23.0, fill: cColor },
  ],
  november: [
    { name: "A", value: 39.5, fill: aColor },
    { name: "B", value: 36.8, fill: bColor },
    { name: "C", value: 23.7, fill: cColor },
  ],
  december: [
    { name: "A", value: 41.7, fill: aColor },
    { name: "B", value: 35.0, fill: bColor },
    { name: "C", value: 23.3, fill: cColor },
  ],
};

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
  const currentMonth = new Date()
    .toLocaleString("default", { month: "long" })
    .toLowerCase();
  const [selected, setSelected] = useState<string>(currentMonth);

  const handleMonthChange = (value: string) => {
    setSelected(value);
  };

  // Get data for the selected month, fallback to January if not found
  const chartData = monthlyData[selected] || monthlyData.january;

  return (
    <section className="section-container h-full">
      <div className="flex items-center justify-between">
        <h3 className="font-bold">Allocation Breakdown</h3>

        <SelectInput
          options={monthOptions}
          placeholder="Select a month"
          label="Month"
          value={selected}
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
              <div className="font-bold">{item.name}</div>
              <div className="font-bold">{item.value}%</div>
            </div>
          ))}
        </div>
        <AllocationPieChart data={chartData} />
        <p className="font-bold md:max-w-[80px] max-md:mt-4">Audit 90% PAC</p>
      </div>
    </section>
  );
}
