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
  name: string;
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
        name: item?.name,
      };
    });

    setAllocationData(formattedAllocationData);
  }, [data?.data]);

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row gap-4 flex-wrap w-full">
        {allocationData?.length > 0 ? (
          allocationData.map((item: AllocationData) => (
            <div className="flex flex-col" key={item.allocationKey}>
              <Link
                to={`/dashboard/allocations/${item?.label.toLowerCase()}`}
                className="w-full"
              >
                <Allocation
                  label={item?.label}
                  chartConfig={item?.chartConfig}
                  allocationKey={item?.allocationKey}
                />
              </Link>
            </div>
          ))
        ) : (
          <section className="">
            <div className="section-container border rounded-md hover:border hover:border-primaryflex items-center justify-center w-full">
              No Allocation Available
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

// import { Link } from "react-router";
// import Allocation from "./Allocation";
// import { useEffect, useState } from "react";
// import type { ChartConfig } from "@/components/ui/chart";
// import { useAllocations } from "@/queries/cryptoQueries";
// import type { TAllocation } from "@/types";
// import { Pen, X } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import AllocationsForm from "@/pages/DataForms/components/AllocationsForm";

// const allocationColors: { [key: string]: string } = {
//   A: "#0867ED",
//   B: "#12BE73",
//   C: "#F2C916",
//   D: "#FF69B4",
// };

// type AllocationData = {
//   label: string;
//   chartConfig: ChartConfig;
//   allocationKey: string;
//   name: string;
// };

// export default function AllAllocationCard({
//   fromDataForms = false,
// }: {
//   fromDataForms?: boolean;
// }) {
//   const { data } = useAllocations();
//   const [allocationData, setAllocationData] = useState<AllocationData[]>([]);

//   const [isEditingAllocations, setIsEditingAllocations] = useState(false);
//   const [allocationToEdit, setAllocationToEdit] = useState("");

//   useEffect(() => {
//     const formattedAllocationData = data?.data.map((item: TAllocation) => {
//       return {
//         label: item.key,
//         allocationKey: item.key,
//         chartConfig: {
//           desktop: {
//             label: "value",
//             color: allocationColors[item.key as keyof typeof allocationColors],
//           },
//         },
//         name: item?.name,
//       };
//     });

//     setAllocationData(formattedAllocationData);
//   }, [data?.data]);

//   return (
//     <div className="w-full">
//       {isEditingAllocations ? (
//         <AllocationsForm
//           allocationToEdit={allocationToEdit}
//           onClose={() => setIsEditingAllocations(false)}
//         />
//       ) : (
//         <div className="flex flex-col md:flex-row gap-4 flex-wrap w-full">
//           {allocationData?.length > 0 ? (
//             allocationData.map((item: AllocationData) => (
//               <div className="flex flex-col" key={item.allocationKey}>
//                 {fromDataForms && (
//                   <div className="flex items-center justify-between mb-2">
//                     <h4>{item?.name}</h4>
//                     <Button
//                       variant={"outline"}
//                       onClick={() => {
//                         setIsEditingAllocations(!isEditingAllocations);
//                         setAllocationToEdit(item.allocationKey);
//                       }}
//                     >
//                       {isEditingAllocations ? (
//                         <>
//                           <X className="h-4 w-4 mr-1" />
//                           Cancel
//                         </>
//                       ) : (
//                         <>
//                           <Pen className="h-4 w-4 mr-1" />
//                           Edit
//                         </>
//                       )}
//                     </Button>
//                   </div>
//                 )}

//                 <Link
//                   to={`/dashboard/allocations/${item?.label.toLowerCase()}`}
//                   className="w-full"
//                 >
//                   <Allocation
//                     label={item?.label}
//                     chartConfig={item?.chartConfig}
//                     allocationKey={item?.allocationKey}
//                   />
//                 </Link>
//               </div>
//             ))
//           ) : (
//             <section className="">
//               <div className="section-container border rounded-md hover:border hover:border-primaryflex items-center justify-center w-full">
//                 No Allocation Available
//               </div>
//             </section>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }
