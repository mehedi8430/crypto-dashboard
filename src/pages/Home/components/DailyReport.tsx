/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { TPerformanceReportCard } from "@/types";
import { Link } from "react-router";
import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { database } from "@/Firebase/Firebase";

export default function DailyReport() {
  const [performanceReportCards, setPerformanceReportCards] = useState<TPerformanceReportCard[]>([]);

  useEffect(() => {
    const vaultReportsRef = ref(database, 'vaultReports');

    onValue(vaultReportsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const reports = Object.values(data) as any[];
        const formattedReports = reports.map(report => ({
          date: new Date(report.reportDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
          deception: report.dailyReportText,
          startingNAV: `$${report.nav.startingNav.toLocaleString()}`,
          endingNAV: `$${report.nav.endingNav.toLocaleString()}`,
          growthRate: {
            value: report.nav.growthPercent,
            sign: (report.nav.growthPercent >= 0 ? "+" : "-") as "+" | "-",
            color: (report.nav.growthPercent >= 0 ? "green" : "red") as "green" | "red",
            formatted: `${report.nav.growthPercent >= 0 ? '+' : ''}${Math.abs(report.nav.growthPercent)}%`,
          },
        })).slice(0, 10); // Limiting to 10 for the dashboard view
        setPerformanceReportCards(formattedReports);
      }
    }, (error) => {
        console.error("Firebase data fetch error:", error);
    });

    return () => {
      onValue(vaultReportsRef, () => {}); // Detach listener
    };
  }, []);

  return (
    <section className="section-container h-full">
      <div className="flex items-center justify-between">
        <h1 className="font-bold">Daily Report</h1>
        <Link to="/dashboard/report">
        <Button variant='link'>View All</Button>
        </Link>
      </div>
      <ScrollArea>
        {
          performanceReportCards.map((item, i) => <div
            key={i}
            className={`flex items-start justify-between py-2 ${performanceReportCards.length - 1 === i ? '' : 'border-b'}`}
          >
            <p className="w-60 line-clamp-2 text-muted-foreground">{item.deception}</p>
            <p className={item.growthRate.sign === '+' ? 'text-green-500' : 'text-red-500'}>
              {item.growthRate.formatted}
            </p>
          </div>)
        }
      </ScrollArea>
    </section>
  );
};