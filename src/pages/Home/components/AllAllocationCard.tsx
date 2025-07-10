import { Link } from "react-router";
import Allocation from "./Allocation";
import { useEffect, useState } from "react";
import { mockData } from "@/data/mockData";

const allocationColors: { [key: string]: string } = {
  A: "#0867ED",
  B: "#12BE73",
  C: "#F2C916",
};

export default function AllAllocationCard() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [allocationData, setAllocationData] = useState<any[]>([]);

  useEffect(() => {
    const allocations = mockData.allocations;

    const formattedAllocationData = Object.keys(allocations).map((key) => {
      const allocation = allocations[key as keyof typeof allocations];
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
            color: allocationColors[key as keyof typeof allocationColors],
          },
        },
      };
    });
    setAllocationData(formattedAllocationData);
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