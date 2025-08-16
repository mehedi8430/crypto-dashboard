import { CalendarDays } from "lucide-react";
import type {
  TPerformanceReportApiResponse,
  TPerformanceReportCard,
} from "@/types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useState } from "react";
import { useReports } from "@/queries/cryptoQueries";

export default function DailyReportCard() {
  const [performanceReportCards, setPerformanceReportCards] = useState<
    TPerformanceReportCard[]
  >([]);

  const { data } = useReports();

  useEffect(() => {
    if (data && data.data) {
      const formattedReports = data.data.map(
        (item: TPerformanceReportApiResponse) => {
          // Handle case where growthRate might already be an object, number, or string
          let growthValue: number;
          if (typeof item.growthRate === "object" && item.growthRate !== null) {
            // If it's already an object with a value property
            growthValue = (item.growthRate as { value: number }).value;
          } else if (typeof item.growthRate === "number") {
            // If it's already a number
            growthValue = item.growthRate;
          } else {
            // If it's a string from the API
            growthValue = parseFloat(item.growthRate || "0");
          }

          const noteLines = item.note.split("\n");
          const reportTextIndex = noteLines.findIndex((line: string) =>
            line.startsWith("- Daily Report Text:")
          );
          let description = item.note;
          if (reportTextIndex !== -1) {
            description = noteLines[reportTextIndex].substring(
              "- Daily Report Text: ".length
            );
          }

          // Safe date parsing
          let dateStr = "Invalid Date";
          if (item.createdAt) {
            try {
              dateStr = new Date(item.createdAt).toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              });
            } catch (e) {
              console.error("Error parsing date:", e);
            }
          }

          return {
            date: dateStr,
            description,
            startingNAV: `$${parseFloat(item.starting).toLocaleString()}`,
            endingNAV: `$${parseFloat(item.ending).toLocaleString()}`,
            growthRate: {
              value: growthValue,
              sign: growthValue >= 0 ? "+" : "-",
              color: growthValue >= 0 ? "green" : "red",
              formatted: `${growthValue >= 0 ? "+" : ""}${Math.abs(
                growthValue
              ).toFixed(6)}%`,
            },
          };
        }
      );
      setPerformanceReportCards(formattedReports);
    }
  }, [data]);

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
                      <p className="text-xs text-muted-foreground">
                        ENDING NAV
                      </p>
                      <p className="font-medium text-foreground">
                        {report.endingNAV}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground text-right">
                        GROWTH RATE
                      </p>
                      <p
                        className={`font-medium text-right ${
                          report.growthRate.sign === "+"
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
                  <p>{report.description}</p>
                </AccordionContent>
              </div>
            </AccordionItem>
          ))}
        </ScrollArea>
      </Accordion>
    </section>
  );
}
