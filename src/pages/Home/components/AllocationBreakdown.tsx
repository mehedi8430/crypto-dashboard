import type { Allocation } from "@/types/allocation.type";
import AllocationPieChart from "./AllocationPieChart";
import { useState, useEffect } from "react";
import { mockData } from "@/data/mockData";

const allocationColors: { [key: string]: string } = {
  A: "#FFC107",
  B: "#007BFF",
  C: "#28A745",
  D: "#FF69B4",
};

export default function AllocationBreakdown() {
  const [chartData, setChartData] = useState<Allocation[]>([]);

  useEffect(() => {
    const allocationData = mockData.allocationBreakdown;

    const formattedChartData = [
      {
        name: "A",
        value: allocationData.A_percent,
        fill: allocationColors.A,
      },
      {
        name: "B",
        value: allocationData.B_percent,
        fill: allocationColors.B,
      },
      {
        name: "C",
        value: allocationData.C_percent,
        fill: allocationColors.C,
      },
      {
        name: "D",
        value: allocationData.D_percent,
        fill: allocationColors.D,
      },
    ];
    setChartData(formattedChartData);
  }, []);

  return (
    <section className="section-container h-full">
      <div className="flex items-center justify-between">
        <h3 className="font-bold">Allocation Breakdown</h3>
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
      </div>
    </section>
  );
}