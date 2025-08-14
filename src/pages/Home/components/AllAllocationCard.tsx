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
  chartConfig: ChartConfig;
  allocationKey: string;
};

export default function AllAllocationCard() {
  const [allocationData, setAllocationData] = useState<AllocationData[]>([]);

  useEffect(() => {
    const allocationsToShow = mockData.allocations;

    const formattedAllocationData = Object.keys(allocationsToShow).map(
      (key) => {
        return {
          label: key,
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
            chartConfig={item.chartConfig}
            allocationKey={item.allocationKey}
          />
        </Link>
      ))}
    </>
  );
}
