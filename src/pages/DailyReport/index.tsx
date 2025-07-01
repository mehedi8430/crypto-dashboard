import { useTitleStore } from "@/stores/titleStore";
import DailyReport from "./components/DailyReport";
import { useEffect } from "react";

export default function DailyReportPage() {
    const { setTitle } = useTitleStore();

    useEffect(() => {
        setTitle('Daily Report');
        return () => setTitle('Dashboard');
    }, [setTitle]);

    return (
        // asd
        <section className="section-container h-screen">
            <div className="w-full">
                <h3 className="justify-start text-(--praimary) text-lg font-semibold font-Inter mb-1 ">Daily Report</h3>
                <p className="justify-start text-(--muted-foreground) text-sm font-medium font-Inter ">Comprehensive daily performance analysis and market commentary</p>
            </div>
            <DailyReport />
        </section>
    );
}
