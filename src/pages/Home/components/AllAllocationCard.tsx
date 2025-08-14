import { Link } from "react-router";
import Allocation from "./Allocation";
import { useEffect, useState } from "react";
import type { ChartConfig } from "@/components/ui/chart";
import { useAllocations } from "@/queries/cryptoQueries";
import type { TAllocation } from "@/types";

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
  const { data } = useAllocations();
  const [allocationData, setAllocationData] = useState<AllocationData[]>([]);

  useEffect(() => {
    const formattedAllocationData = data?.data.map((item: TAllocation) => {
      return {
        label: item.key,
        allocationKey: item.key,
        chartConfig: {
          desktop: {
            label: "value",
            color: allocationColors[item.key as keyof typeof allocationColors],
          },
        },
      };
    });

    setAllocationData(formattedAllocationData);
  }, [data?.data]);

  return (
    <>
      {allocationData?.length > 0 ? (
        allocationData.map((item) => (
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
        ))
      ) : (
        <section className="col-span-4 lg:col-span-4">
          <div className="section-container border rounded-md hover:border hover:border-primaryflex items-center justify-center w-full">
            No Allocation Available
          </div>
        </section>
      )}
    </>
  );
}
