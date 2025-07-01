import { CalendarDays } from "lucide-react";
import type { TPerformanceReportCard } from "@/types";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

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
                {performanceReportCards.map((report, index) => (
                    <AccordionItem
                        value={`item-${index + 1}`}
                        key={index}
                        className="border-b-0 mb-5"
                    >
                        <div className="rounded-lg border shadow-sm">
                            <div className="bg-card text-card-foreground flex flex-col sm:flex-row items-start sm:items-center justify-between rounded-lg px-4 sm:px-5 py-4 sm:py-[18px] shadow-sm w-full gap-4 sm:gap-0">
                                {/* Left Section */}
                                <div className="flex items-center gap-4 w-full sm:w-auto">
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <AccordionTrigger className="hover:no-underline" />
                                    </div>
                                    <CalendarDays className="h-6 w-6 text-muted-foreground" />
                                    <div className="flex-1 sm:flex-none">
                                        <p className="font-medium text-foreground">
                                            {report.date}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            Daily Performance Report
                                        </p>
                                    </div>
                                </div>

                                {/* Right Section */}
                                <div className="flex items-center gap-4 w-full sm:w-auto">
                                    <div className="flex-1 sm:flex-none">
                                        <p className="text-[7px] md:text-xs text-muted-foreground">
                                            STARTING NAV
                                        </p>
                                        <p className="font-medium text-foreground">
                                            {report.startingNAV}
                                        </p>
                                    </div>
                                    <div className="flex-1 sm:flex-none">
                                        <p className="text-[7px] md:text-xs text-muted-foreground">ENDING NAV</p>
                                        <p className="font-medium text-foreground">
                                            {report.endingNAV}
                                        </p>
                                    </div>
                                    <div className="flex-1 sm:flex-none">
                                        <p className="text-[7px] md:text-xs text-muted-foreground sm:text-right">
                                            GROWTH RATE
                                        </p>
                                        <p
                                            className={`font-medium sm:text-right ${report.growthRate.sign === "+"
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
                            <AccordionContent className="bg-card text-card-foreground border-t rounded-b-lg py-4 px-4 sm:px-10">
                                <p>{report.deception}</p>
                            </AccordionContent>
                        </div>
                    </AccordionItem>
                ))}
            </Accordion>
        </section>
    );
}