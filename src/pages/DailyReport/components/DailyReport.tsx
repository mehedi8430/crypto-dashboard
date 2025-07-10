/* eslint-disable @typescript-eslint/no-explicit-any */
import { CalendarDays } from "lucide-react";
import type { TPerformanceReportCard } from "@/types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useState } from "react";
import { mockData } from "@/data/mockData";

export default function DailyReport() {
  const [performanceReportCards, setPerformanceReportCards] = useState<TPerformanceReportCard[]>([]);

  useEffect(() => {
    const formattedReports = [mockData].map(report => ({
        date: new Date(report.reportDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
        deception: report.dailyReportText,
        startingNAV: `$${report.nav.startingNav.toLocaleString()}`,
        endingNAV: `$${report.nav.endingNav.toLocaleString()}`,
        growthRate: {
        value: report.nav.growthPercent,
        sign: (report.nav.growthPercent >= 0 ? "+" : "-") as "+" | "-",
        color: (report.nav.growthPercent >= 0 ? "green" : "red") as "green" | "red",
        formatted: `${report.nav.growthPercent >= 0 ? '+' : '-'}${Math.abs(report.nav.growthPercent)}%`,
        },
    }));
    setPerformanceReportCards(formattedReports);
  }, []);

  return (
    <section className="flex flex-col gap-4">
      <Accordion type="single" collapsible className="w-full">
        <ScrollArea className="h-[85vh]">
          {performanceReportCards.map((report, index) => (
            <AccordionItem
              value={`item-${index + 1}`}
              key={index}
              className="border-b-0 mb-5"
            >
              <div className="rounded-lg border shadow-sm ">
                <div className="bg-card text-card-foreground flex items-center justify-between rounded-lg px-5 py-[18px] shadow-sm w-full flex-wrap">
                  {/* Left Section */}
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <AccordionTrigger className="hover:no-underline" />
                    </div>
                    <CalendarDays className="h-6 w-6 text-muted-foreground" />
                    <div>
                      <p className="font-medium text-foreground">
                        {report.date}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Daily Performance Report
                      </p>
                    </div>
                  </div>

                  {/* Right Section */}
                  <div className="flex items-center gap-30">
                    <div>
                      <p className="text-xs text-muted-foreground">
                        STARTING NAV
                      </p>
                      <p className="font-medium text-foreground">
                        {report.startingNAV}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">ENDING NAV</p>
                      <p className="font-medium text-foreground">
                        {report.endingNAV}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground text-right">
                        GROWTH RATE
                      </p>
                      <p
                        className={`font-medium text-right ${report.growthRate.sign === "+"
                            ? "text-green-500"
                            : "text-red-500"
                          }`}
                      >
                        {report.growthRate.formatted}
                      </p>
                    </div>
                  </div>
                </div>
                <AccordionContent className="bg-card text-card-foreground border-t rounded-b-lg py-4 px-10">
                  <p>{report.deception}</p>
                </AccordionContent>
              </div>
            </AccordionItem>
          ))}
        </ScrollArea>
      </Accordion>
    </section>
  );
}