/* eslint-disable @typescript-eslint/no-explicit-any */
import { useTitleStore } from "@/stores/titleStore";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import AllocationsChart from "./components/AllocationsChart";
import type { TPerformanceRecord } from "@/types";
import { DataTable } from "@/components/DataTable/dataTable";
import type { ColumnDef } from "@tanstack/react-table";
import { AllocationMetricsPanel } from "./components/AllocationMetricsPanel";
import { mockData } from "@/data/mockData";

export default function Allocations() {
  const { pathname } = useLocation();
  const { setTitle } = useTitleStore();
  const [financialData, setFinancialData] = useState<TPerformanceRecord[]>([]);
  const [statics, setStatics] = useState<any[]>([]);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(20);

  const allocation =
    pathname.endsWith('/a') ? "a" :
      pathname.endsWith('/b') ? "b" :
        pathname.endsWith('/c') ? "c" :
          pathname.endsWith('/d') ? "d" :
            null;

  useEffect(() => {
    setTitle(
      allocation ? `Allocations ${allocation.toUpperCase()}` : 'Allocations'
    );
    return () => setTitle('Dashboard');
  }, [pathname, setTitle, allocation]);

  useEffect(() => {
    if (!allocation) return;

    const allocationData = mockData.allocations[allocation.toUpperCase() as keyof typeof mockData.allocations];

    if (allocationData) {
        setFinancialData(allocationData.dailyPerformanceHistory.map((item: any) => ({
          ...item,
          balance: `$${item.balance.toLocaleString()}`,
          dailyChange: `${item.dailyChange >= 0 ? '+' : '-'}$${Math.abs(item.dailyChange).toLocaleString()}`,
          percentChange: `${item.percentChange >= 0 ? '+' : '-'}${Math.abs(item.percentChange)}%`,
        })));

        setStatics([
          {
            title: 'Starting Balance',
            total: `$${allocationData.startingBalance.toLocaleString()}`,
          },
          {
            title: 'Current Balance',
            total: `$${allocationData.endingBalance.toLocaleString()}`,
          },
          {
            title: 'Daily performance',
            total: `${allocationData.dailyGain >= 0 ? '+' : '-'}$${Math.abs(allocationData.dailyGain).toLocaleString()}`,
          },
          {
            title: 'Total Return',
            total: `${allocationData.dailyGainPercent >= 0 ? '+' : ''}${allocationData.dailyGainPercent}%`,
          },
        ]);
      }


  }, [allocation]);

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
      {/* Chart Section */}
      <section className="section-container">
        <AllocationsChart
          allocation={allocation}
        />
      </section>

      {/* Allocation Overview Section */}
      <section className="section-container">
        <div>
          <div className="flex items-start justify-between">
            <h2 className="font-bold">
              Allocation {allocation?.toUpperCase()}:
              {
                allocation === 'a' ? " Core Holdings" :
                  allocation === 'b' ? " Growth Strategy" :
                    " Alternative Assets"
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

        {/* Stats Grid - Made Responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {
            statics.map((item, i) => (
              <div key={i} className="border rounded-xl p-5">
                <p className="text-muted-foreground text-sm">{item.title}</p>
                <h1 className="font-bold text-2xl lg:text-4xl">{item.total}</h1>
              </div>
            ))
          }
        </div>

        {/* Allocation Metrics Panel */}
        {allocation && <AllocationMetricsPanel allocation={allocation} />}
      </section>

      {/* Daily Performance History Section - Fixed Container */}
      <section className="section-container">
        <div className="space-y-4">
          <h2 className="font-bold">Daily Performance History</h2>
          <div
            className="
            w-[15.9rem] 
            min-[330px]:w-[16.5rem] 
            min-[340px]:w-[17.1rem] 
            min-[350px]:w-[17.7rem] 
            min-[360px]:w-[18.3rem] 
            min-[370px]:w-[18.9rem] 
            min-[380px]:w-[19.5rem] 
            min-[390px]:w-[20.1rem] 
            min-[400px]:w-[20.7rem] 
            min-[410px]:w-[21.3rem] 
            min-[420px]:w-[21.9rem] 
            min-[430px]:w-[22.5rem] 
            min-[440px]:w-[23.1rem] 
            min-[450px]:w-[23.7rem] 
            min-[460px]:w-[24.3rem] 
            min-[470px]:w-full
          "
          >
            <DataTable<TPerformanceRecord>
              data={financialData}
              columns={columns}
              isLoading={!financialData.length}
              page={page}
              limit={limit}
              total={financialData.length}
              onPageChange={setPage}
              onLimitChange={setLimit}
            />
          </div>
        </div>
      </section>
    </section>
  );
};