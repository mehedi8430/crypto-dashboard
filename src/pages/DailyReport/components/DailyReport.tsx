import { CalendarDays } from "lucide-react";
import type { TPerformanceReportCard } from "@/types";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function DailyReport() {
    const performanceReportCards: TPerformanceReportCard[] = Array(10).fill({
        date: "Wednesday, January 15, 2025",
        deception:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. ",
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
                                                {report.growthRate.sign}
                                                {report.growthRate.value}%
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