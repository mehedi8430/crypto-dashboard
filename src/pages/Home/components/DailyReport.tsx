import { Button } from "@/components/ui/button";
import type {
  TPerformanceReportApiResponse,
  TPerformanceReportCard,
} from "@/types";
import { Link } from "react-router";
import { useEffect, useState } from "react";
import { useReports } from "@/queries/cryptoQueries";

export default function DailyReport() {
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
    <section className="section-container h-full">
      <div className="flex items-center justify-between">
        <h3 className="">Daily Report</h3>
        <Link to="/dashboard/report">
          <Button variant="link">View All</Button>
        </Link>
      </div>
      <div className="h-full overflow-y-auto">
        {performanceReportCards.map((item, i) => (
          <div
            key={i}
            className={`flex items-start justify-between py-2 ${
              performanceReportCards.length - 1 === i ? "" : "border-b"
            }`}
          >
            <p className="w-60 line-clamp-2 text-muted-foreground">
              {item?.description}
            </p>
            <p
              className={
                item.growthRate.sign === "+" ? "text-green-500" : "text-red-500"
              }
            >
              {item.growthRate.formatted}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
