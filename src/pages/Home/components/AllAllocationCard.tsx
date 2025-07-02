import { Link } from "react-router";
import Allocation from "./Allocation";
import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { database } from "@/Firebase/Firebase";

const allocationColors: { [key: string]: string } = {
  A: "#0867ED",
  B: "#12BE73",
  C: "#F2C916",
};

export default function AllAllocationCard() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [allocationData, setAllocationData] = useState<any[]>([]);

  useEffect(() => {
    const vaultReportsRef = ref(database, 'vaultReports');

    onValue(vaultReportsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const reports = Object.values(data) as any[];
        if (reports.length > 0) {
          const latestReport = reports[reports.length - 1];
          const allocations = latestReport.allocations;

          const formattedAllocationData = Object.keys(allocations).map((key) => {
            const allocation = allocations[key];
            return {
              label: key,
              startingBalance: allocation.startingBalance,
              endingBalance: allocation.endingBalance,
              gainPercent: allocation.dailyGainPercent,
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              chartData: allocation.chartData.map((d: any) => ({...d, day: new Date(d.date).toLocaleDateString('en-US', { weekday: 'short' }), value: d.balance})),
              chartConfig: {
                desktop: {
                  label: "value",
                  color: allocationColors[key],
                },
              },
            };
          });
          setAllocationData(formattedAllocationData);
        }
      }
    });

    return () => {
      onValue(vaultReportsRef, () => {}); // Detach listener
    };
  }, []);

  return (
    <>
      {allocationData.map((item) => (
        <Link
          to={`/dashboard/allocations/${item.label.toLowerCase()}`}
          className="col-span-4 lg:col-span-1"
          key={item.label}
        >
          <Allocation
            label={item.label}
            startingBalance={item.startingBalance}
            endingBalance={item.endingBalance}
            gainPercent={item.gainPercent}
            chartData={item.chartData}
            chartConfig={item.chartConfig}
          />
        </Link>
      ))}
    </>
  );
}