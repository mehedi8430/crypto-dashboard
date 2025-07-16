/* eslint-disable @typescript-eslint/no-unused-vars */
import { Link } from "react-router";
import Allocation from "./Allocation";
import { useEffect, useState } from "react";
import { mockData } from "@/data/mockData";
import type { ChartConfig } from "@/components/ui/chart";

const allocationColors: { [key: string]: string } = {
  A: "#0867ED",
  B: "#12BE73",
  C: "#F2C916",
  D: "#FF69B4",
};

type AllocationData = {
  label: string;
  startingBalance: number;
  endingBalance: number;
  gainPercent: number;
  chartData: { day: string; value: number }[];
  chartConfig: ChartConfig;
  allocationKey: string;
};

export default function AllAllocationCard() {
  const [allocationData, setAllocationData] = useState<AllocationData[]>([]);

  useEffect(() => {
    const allocationsToShow = mockData.allocations;

    const formattedAllocationData = Object.keys(allocationsToShow).map(
      (key) => {
        const allocation =
          allocationsToShow[key as keyof typeof allocationsToShow];
        return {
          label: key,
          startingBalance: allocation.startingBalance,
          endingBalance: allocation.endingBalance,
          gainPercent: allocation.dailyGainPercent,
          chartData: allocation.chartData.map(
            (d: { date: string; balance: number }) => ({
              ...d,
              day: new Date(d.date).toLocaleDateString("en-US", {
                weekday: "short",
              }),
              value: d.balance,
            })
          ),
          allocationKey: key,
          chartConfig: {
            desktop: {
              label: "value",
              color: allocationColors[key as keyof typeof allocationColors],
            },
          },
        };
      }
    );
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
            allocationKey={item.allocationKey}
          />
        </Link>
      ))}
    </>
  );
}
