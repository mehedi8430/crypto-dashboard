import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { TPerformanceReportCard } from "@/types";

export default function DailyReport() {
  const performanceReportCards: TPerformanceReportCard[] = Array(10).fill({
    date: "Wednesday, January 15, 2025",
    deception: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. ",
    startingNAV: "$3,156,789",
    endingNAV: "$3,156,789",
    growthRate: {
      value: 1.34,
      sign: "+",
      color: "green",
      formatted: "+1.34",
    },
  });

  return (
    <section className="section-container h-full">
      <div className="flex items-center justify-between">
        <h1 className="font-bold">Daily Report</h1>
        <Button variant='link'>View All</Button>
      </div>
      <ScrollArea>
        {
          performanceReportCards.map((item, i) => <div
            key={i}
            className={`flex items-start justify-between py-2 ${performanceReportCards.length - 1 === i ? '' : 'border-b'}`}
          >
            <p className="w-60 line-clamp-2 text-muted-foreground">{item.deception}</p>
            <p className={item.growthRate.sign === '+' ? 'text-green-500' : 'text-red-500'}>
              {item.growthRate.sign}{item.growthRate.value}%
            </p>
          </div>)
        }
      </ScrollArea>
    </section>
  );
};
