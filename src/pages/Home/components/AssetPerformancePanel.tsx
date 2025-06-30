import { DataTable } from "@/components/DataTable/dataTable";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import type { TCoinData } from "@/types";
import type { ColumnDef } from "@tanstack/react-table";
import { ArrowDown, ArrowUp } from "lucide-react";
import { useState } from "react";

// coins images
import ETH from "@/assets/icons/coins/Ethereum ETH.png"
import BTC from "@/assets/icons/coins/Group (1).png"
import T from "@/assets/icons/coins/Group (2).png"
import D from "@/assets/icons/coins/Group (3).png"
import Synthetix from "@/assets/icons/coins/Synthetix Network SNX.png"
import TrueUSD from "@/assets/icons/coins/TrueUSD TUSD.png"

export default function AssetPerformancePanel(): React.ReactNode {
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(15);

  const coins: TCoinData[] = [
    {
      image:ETH,
      name: "Ethereum",
      symbol: "ETH",
      open: "+4.68",
      close: "+0%",
      change: "+68",
      volume: "00.10%",
      volumeTrend: "up",
    },
    {
      image:BTC,
      name: "Bitcoin",
      symbol: "BTC",
      open: "+4.68",
      close: "+0%",
      change: "+68",
      volume: "00.10%",
      volumeTrend: "down",
    },
    {
      image:TrueUSD,
      name: "TrueUSD",
      symbol: "USDT",
      open: "+4.68",
      close: "+0%",
      change: "+68",
      volume: "00.10%",
      volumeTrend: "up",
    },
    {
      image:T,
      name: "Tether",
      symbol: "TUSD",
      open: "+4.68",
      close: "+0%",
      change: "+68",
      volume: "00.10%",
      volumeTrend: "up",
    },
    {
      image:D,
      name: "DAI",
      symbol: "DUSD",
      open: "+4.68",
      close: "+0%",
      change: "+68",
      volume: "00.10%",
      volumeTrend: "down",
    },
    {
      image:Synthetix,
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
            <AvatarFallback className="text-white font-semibold">
              <img src={row.original.image} alt="" />
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
          flex items-center justify-center
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
    }
  ];

  return (
    <section className="section-container">
      <h3 className="font-bold">Asset Performance Panel</h3>

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
          isPagination={false}
        // actions={() => (
        //   <div>
        //     <EllipsisVertical />
        //   </div>
        // )}
        />
      </div>
    </section>
  );
};
