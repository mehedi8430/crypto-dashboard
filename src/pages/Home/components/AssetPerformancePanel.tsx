/* eslint-disable @typescript-eslint/no-explicit-any */
import { DataTable } from "@/components/DataTable/dataTable";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import type { TCoinData } from "@/types";
import type { ColumnDef } from "@tanstack/react-table";
import { ArrowDown, ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { database } from "@/Firebase/Firebase";

// coins images
import ETH from "@/assets/icons/coins/Ethereum ETH.png";
import BTC from "@/assets/icons/coins/Group (1).png";
import T from "@/assets/icons/coins/Group (2).png";
import D from "@/assets/icons/coins/Group (3).png";
import Synthetix from "@/assets/icons/coins/Synthetix Network SNX.png";
import TrueUSD from "@/assets/icons/coins/TrueUSD TUSD.png";

const coinImages: { [key: string]: string } = {
  ETH,
  BTC,
  TUSD: TrueUSD,
  USDT: T,
  DAI: D,
  SUSD: Synthetix,
};

export default function AssetPerformancePanel(): React.ReactNode {
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(15);
  const [coins, setCoins] = useState<TCoinData[]>([]);

  useEffect(() => {
    const vaultReportsRef = ref(database, "vaultReports");

    onValue(vaultReportsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const reports = Object.values(data) as any[];
        if (reports.length > 0) {
          const latestReport = reports[reports.length - 1];
          const assetPerformanceData = latestReport.assetPerformance;

          const formattedCoinsData = Object.keys(assetPerformanceData).map(
            (key) => {
              const coin = assetPerformanceData[key];
              return {
                image: coinImages[key],
                name: key,
                symbol: coin.symbol,
                open: `+${coin.open}`,
                close: `+${coin.close}%`,
                change: `+${coin.changePercent}`,
                volume: `${(coin.volumeUsd / 1000000).toFixed(2)}M`,
                volumeTrend:
                  coin.changePercent >= 0 ? ("up" as const) : ("down" as const),
              };
            }
          );
          setCoins(formattedCoinsData);
        }
      }
    });

    return () => {
      onValue(vaultReportsRef, () => { }); // Detach listener
    };
  }, []);

  const columns: ColumnDef<TCoinData>[] = [
    {
      accessorKey: "name",
      header: "Name",
      enableHiding: true,
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarFallback className="text-white font-semibold">
              <img src={row.original.image} alt="" />
            </AvatarFallback>
          </Avatar>
          <p>{row.original.name}</p>
        </div>
      ),
    },
    {
      accessorKey: "symbol",
      header: "",
      enableHiding: true,
      cell: ({ row }) => (
        <p className="text-muted-foreground">{row.original.symbol}</p>
      ),
    },
    {
      accessorKey: "open",
      header: "Open",
      enableHiding: true,
    },
    {
      accessorKey: "close",
      header: "Close",
      enableHiding: true,
    },
    {
      accessorKey: "change",
      header: "Change",
      enableHiding: true,
    },
    {
      accessorKey: "volume",
      header: "Volume",
      enableHiding: true,
      cell: ({ row }) => (
        <div
          className={`
          flex items-center justify-center
          ${row.original.volumeTrend === "up"
              ? "text-green-500"
              : "text-red-500"
            }
        `}
        >
          <p>{row.original.volume}</p>
          <div>
            {row.original.volumeTrend === "up" ? <ArrowUp /> : <ArrowDown />}
          </div>
        </div>
      ),
    },
  ];

  return (
    <section className="section-container">
      <h3 className="font-bold">Asset Performance Panel</h3>
      <div>
        <DataTable<TCoinData>
          data={coins}
          columns={columns}
          isLoading={!coins.length}
          page={page}
          limit={limit}
          total={coins.length}
          onPageChange={setPage}
          onLimitChange={setLimit}
          isPagination={false}
        />
      </div>
    </section>
  );
}
