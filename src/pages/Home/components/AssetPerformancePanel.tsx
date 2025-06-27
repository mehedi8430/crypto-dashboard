import { DataTable } from "@/components/DataTable/dataTable";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import type { TCoinData } from "@/types";
import type { ColumnDef } from "@tanstack/react-table";
import { ArrowDown, ArrowUp, EllipsisVertical } from "lucide-react";
import { useState } from "react";

export default function AssetPerformancePanel() {
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(15);

  const coins: TCoinData[] = [
    {
      name: "Ethereum",
      symbol: "ETH",
      open: "+4.68",
      close: "+0%",
      change: "+68",
      volume: "00.10%",
      volumeTrend: "up",
    },
    {
      name: "Bitcoin",
      symbol: "BTC",
      open: "+4.68",
      close: "+0%",
      change: "+68",
      volume: "00.10%",
      volumeTrend: "down",
    },
    {
      name: "TrueUSD",
      symbol: "USDT",
      open: "+4.68",
      close: "+0%",
      change: "+68",
      volume: "00.10%",
      volumeTrend: "up",
    },
    {
      name: "Tether",
      symbol: "TUSD",
      open: "+4.68",
      close: "+0%",
      change: "+68",
      volume: "00.10%",
      volumeTrend: "up",
    },
    {
      name: "DAI",
      symbol: "DUSD",
      open: "+4.68",
      close: "+0%",
      change: "+68",
      volume: "00.10%",
      volumeTrend: "down",
    },
    {
      name: "Synthetix",
      symbol: "SUSD",
      open: "+4.68",
      close: "+0%",
      change: "+68",
      volume: "00.10%",
      volumeTrend: "down",
    },
  ];

  const columns: ColumnDef<TCoinData>[] = [
    {
      accessorKey: 'name',
      header: 'Name',
      enableHiding: true,
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Avatar>
            {/* <AvatarImage src={row?.original?.avatar} alt="avatar" /> */}
            <AvatarFallback className="bg-primary text-white font-semibold">
              CA
            </AvatarFallback>
          </Avatar>
          <p>{row.original.name}</p>
        </div>
      ),
    },
    {
      accessorKey: 'symbol',
      header: '',
      enableHiding: true,
      cell: ({ row }) => (
        <p className="text-muted-foreground">{row.original.symbol}</p>
      )
    },
    {
      accessorKey: 'open',
      header: 'Open',
      enableHiding: true,
    },
    {
      accessorKey: 'close',
      header: 'Close',
      enableHiding: true,
    },
    {
      accessorKey: 'change',
      header: 'Change',
      enableHiding: true,
    },
    {
      accessorKey: 'volume',
      header: 'Volume',
      enableHiding: true,
      cell: ({ row }) => (
        <div className={`
          flex items-center
          ${row.original.volumeTrend === 'up' ? 'text-green-500' : 'text-red-500'}
        `}>
          <p>{row.original.volume}</p>
          <div>
            {
              row.original.volumeTrend === 'up' ? <ArrowUp /> : <ArrowDown />
            }
          </div>
        </div>
      )
    },
    // {
    //   accessorKey: 'volumeTrend',
    //   header: 'Volume Trend',
    //   enableHiding: true,
    // }
  ];

  return (
    <section className="section-container">
      <h3>Asset Performance Panel</h3>

      <div>
        <DataTable<TCoinData>
          data={coins}
          columns={columns}
          isLoading={false}
          page={page}
          limit={limit}
          total={35}
          onPageChange={setPage}
          onLimitChange={setLimit}
          actions={() => (
            <div>
              <EllipsisVertical />
            </div>
          )}
        />
      </div>
    </section>
  );
};
