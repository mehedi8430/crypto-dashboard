import { useTitleStore } from "@/stores/titleStore";
import { useEffect } from "react";
import { useLocation } from "react-router";
import AllocationsChart from "./components/AllocationsChart";
import type { TPerformanceRecord } from "@/types";
import { DataTable } from "@/components/DataTable/dataTable";
import type { ColumnDef } from "@tanstack/react-table";
import { AllocationMetricsPanel } from "./components/AllocationMetricsPanel";

export default function Allocations() {
  const { pathname } = useLocation();
  const { setTitle } = useTitleStore();

  const financialData: TPerformanceRecord[] = [
    { date: "June 23, 2025", balance: "$1,337,420.30", dailyChange: "+$3,088.08", percentChange: "+0.26", notes: "-" },
    { date: "June 23, 2025", balance: "$1,337,420.30", dailyChange: "-$12,530.77", percentChange: "-0.26", notes: "-" },
    { date: "June 23, 2025", balance: "$1,337,420.30", dailyChange: "+$3,088.08", percentChange: "+0.26", notes: "-" },
    { date: "June 23, 2025", balance: "$1,337,420.30", dailyChange: "-$12,530.77", percentChange: "-0.26", notes: "-" },
    { date: "June 23, 2025", balance: "$1,337,420.30", dailyChange: "+$3,088.08", percentChange: "+0.26", notes: "-" },
    { date: "June 23, 2025", balance: "$1,337,420.30", dailyChange: "-$12,530.77", percentChange: "-0.26", notes: "-" },
    { date: "June 23, 2025", balance: "$1,337,420.30", dailyChange: "+$3,088.08", percentChange: "+0.26", notes: "-" },
    { date: "June 23, 2025", balance: "$1,337,420.30", dailyChange: "-$12,530.77", percentChange: "-0.26", notes: "-" },
    { date: "June 23, 2025", balance: "$1,337,420.30", dailyChange: "+$3,088.08", percentChange: "+0.26", notes: "-" },
    { date: "June 23, 2025", balance: "$1,337,420.30", dailyChange: "-$12,530.77", percentChange: "-0.26", notes: "-" },
    { date: "June 23, 2025", balance: "$1,337,420.30", dailyChange: "+$3,088.08", percentChange: "+0.26", notes: "-" },
    { date: "June 23, 2025", balance: "$1,337,420.30", dailyChange: "-$12,530.77", percentChange: "-0.26", notes: "-" },
    { date: "June 23, 2025", balance: "$1,337,420.30", dailyChange: "+$3,088.08", percentChange: "+0.26", notes: "-" },
    { date: "June 23, 2025", balance: "$1,337,420.30", dailyChange: "-$12,530.77", percentChange: "-0.26", notes: "-" },
    { date: "June 23, 2025", balance: "$1,337,420.30", dailyChange: "+$3,088.08", percentChange: "+0.26", notes: "-" },
    { date: "June 23, 2025", balance: "$1,337,420.30", dailyChange: "-$12,530.77", percentChange: "-0.26", notes: "-" },
    { date: "June 23, 2025", balance: "$1,337,420.30", dailyChange: "+$3,088.08", percentChange: "+0.26", notes: "-" },
    { date: "June 23, 2025", balance: "$1,337,420.30", dailyChange: "-$12,530.77", percentChange: "-0.26", notes: "-" },
    { date: "June 23, 2025", balance: "$1,337,420.30", dailyChange: "+$3,088.08", percentChange: "+0.26", notes: "-" },
    { date: "June 23, 2025", balance: "$1,337,420.30", dailyChange: "-$12,530.77", percentChange: "-0.26", notes: "-" }
  ];

  const statics = [
    {
      title: 'Starting Balance',
      total: '$1,337,420.30',
      progress: 0.10
    },
    {
      title: 'Current Balance',
      total: '$1,337,420.30',
      progress: 0
    },
    {
      title: 'Daily performance',
      total: '$1,337,420.30',
      progress: 0
    },
    {
      title: 'Total Return',
      total: '$1,337,420.30',
      progress: 0.20
    },
  ];

  useEffect(() => {
    setTitle(
      pathname.endsWith('/a') ? 'Allocations A' :
        pathname.endsWith('/b') ? 'Allocations B' :
          pathname.endsWith('/c') ? 'Allocations C' : ''
    );
    return () => setTitle('Dashboard');
  }, [pathname, setTitle]);

  const allocation =
    pathname.endsWith('/a') ? "a" :
      pathname.endsWith('/b') ? "b" :
        pathname.endsWith('/c') ? "c" :
          null;

  const columns: ColumnDef<TPerformanceRecord>[] = [
    {
      accessorKey: 'date',
      header: 'Date',
      enableHiding: true
    },
    {
      accessorKey: 'balance',
      header: 'Balance',
      enableHiding: true
    },
    {
      accessorKey: 'dailyChange',
      header: 'Daily Change',
      enableHiding: true,
    },
    {
      accessorKey: 'percentChange',
      header: '%Change',
      enableHiding: true,
    },
    {
      accessorKey: 'notes',
      header: 'Notes',
      enableHiding: true,
    }
  ];

  return (
    <section className="space-y-4">
      <div className="w-full ">
        <AllocationsChart
          allocation={
            pathname.endsWith('/a') ? "a" :
              pathname.endsWith('/b') ? "b" :
                pathname.endsWith('/c') ? "c" :
                  null
          }
        />
      </div>

      <div className="section-container">
        <div>
          <div className="flex items-start justify-between">
            <h2 className="font-bold">
              Allocation
              {
                pathname.endsWith('/a') ? " A" :
                  pathname.endsWith('/b') ? " B" :
                    pathname.endsWith('/c') ? " C" :
                      null
              }:
              {
                pathname.endsWith('/a') ? " Core Holdings" :
                  pathname.endsWith('/b') ? " Growth Strategy" :
                    pathname.endsWith('/c') ? " Alternative Assets" :
                      null
              }
            </h2>

            <div className={`
          size-4 rounded-full
          ${pathname.endsWith('/a') ? "bg-[#0867ED]" :
                pathname.endsWith('/b') ? "bg-[#00CA72]" :
                  pathname.endsWith('/c') ? "bg-[#F2C916]" :
                    ''
              } 
        `}></div>
          </div>
          <p className="text-muted-foreground">Performance overview and daily tracking</p>
        </div>
        <div className="flex items-center gap-4">
          {
            statics.map((item, i) => (
              <div key={i} className="w-full border rounded-xl p-5">
                <p className="text-muted-foreground">{item.title}</p>
                <h1 className="font-bold text-4xl">{item.total}</h1>
              </div>
            ))
          }
        </div>
      <div className="">
        {allocation && <AllocationMetricsPanel allocation={allocation} />}
      </div>

      </div>

      <div className="section-container">
        <h2 className="font-bold">Daily Performance History</h2>
        <DataTable<TPerformanceRecord>
          data={financialData}
          columns={columns}
          isLoading={false}
          page={1}
          limit={20}
          total={35}
          onPageChange={() => { }}
          onLimitChange={() => { }}
        />
      </div>
      
    </section>
  );
};