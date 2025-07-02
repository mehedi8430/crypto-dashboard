import type { Allocation } from "@/types/allocation.type";
import AllocationPieChart from "./AllocationPieChart";
import { useState, useEffect } from "react";
import { ref, onValue } from "firebase/database";
import { database } from "@/Firebase/Firebase";

const allocationColors = {
  A: "#FFC107",
  B: "#007BFF",
  C: "#28A745",
};

export default function AllocationBreakdown() {
  const [chartData, setChartData] = useState<Allocation[]>([]);

  useEffect(() => {
    const vaultReportsRef = ref(database, "vaultReports");

    onValue(vaultReportsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const reports = Object.values(data) as any[];
        if (reports.length > 0) {
          const latestReport = reports[reports.length - 1];
          const allocationData = latestReport.allocationBreakdown;

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
          ];
          setChartData(formattedChartData);
        }
      }
    });

    return () => {
      onValue(vaultReportsRef, () => {}); // Detach listener
    };
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
        {/* <p className="font-bold md:max-w-[80px] max-md:mt-4">Audit 90% PAC</p> */}
      </div>
    </section>
  );
}
