/* eslint-disable @typescript-eslint/no-explicit-any */
import { useTitleStore } from "@/stores/titleStore";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import AllocationsChart from "./components/AllocationsChart";
import type { TPerformanceRecord } from "@/types";
import { DataTable } from "@/components/DataTable/dataTable";
import type { ColumnDef } from "@tanstack/react-table";
import { AllocationMetricsPanel } from "./components/AllocationMetricsPanel";
import { ref, onValue } from "firebase/database";
import { database } from "@/Firebase/Firebase";

export default function Allocations() {
  const { pathname } = useLocation();
  const { setTitle } = useTitleStore();
  const [financialData, setFinancialData] = useState<TPerformanceRecord[]>([]);
  const [statics, setStatics] = useState<any[]>([]);

  const allocation =
    pathname.endsWith('/a') ? "a" :
      pathname.endsWith('/b') ? "b" :
        pathname.endsWith('/c') ? "c" :
          null;

  useEffect(() => {
    setTitle(
      allocation ? `Allocations ${allocation.toUpperCase()}` : 'Allocations'
    );
    return () => setTitle('Dashboard');
  }, [pathname, setTitle, allocation]);

  useEffect(() => {
    if (!allocation) return;

    const vaultReportsRef = ref(database, 'vaultReports');

    onValue(vaultReportsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const reports = Object.values(data) as any[];
        if (reports.length > 0) {
          const latestReport = reports[reports.length - 1];
          const allocationData = latestReport.allocations[allocation.toUpperCase()];

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
        }
      }
    });

    return () => {
      onValue(vaultReportsRef, () => {}); // Detach listener
    };
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
      <div className="w-full">
        <AllocationsChart
          allocation={allocation}
        />
      </div>

      {/* Allocation Overview Section */}
      <div className="section-container">
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

        {/* Allocation Metrics Panel */}
        <div className="w-full overflow-hidden">
          {allocation && <AllocationMetricsPanel allocation={allocation} />}
        </div>
      </div>

      {/* Daily Performance History Section */}
      <div className="section-container">
        <h2 className="font-bold">Daily Performance History</h2>
        <DataTable<TPerformanceRecord>
          data={financialData}
          columns={columns}
          isLoading={!financialData.length}
          page={1}
          limit={20}
          total={financialData.length}
          onPageChange={() => { }}
          onLimitChange={() => { }}
        />
      </div>
      
    </section>
  );
};