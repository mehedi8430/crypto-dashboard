import SearchInput from "@/components/SearchInput";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import TotalNavPanel from "./components/TotalNavPanel";
import AllocationBreakdown from "./components/AllocationBreakdown";
import AssetPerformancePanel from "./components/AssetPerformancePanel";
import FromTheNews from "./components/FromTheNews";
import DailyReport from "./components/DailyReport";
import { AllocationA } from "./components/AllocationA";
import { AllocationB } from "./components/AllocationB";
import { AllocationC } from "./components/AllocationC";

export default function HomePage() {
  const [value, setValue] = useState<string>("");

  return (
    <section className="px-0 lg:px-4">
      <div className="md:hidden mb-4 flex items-center justify-center">
        <SearchInput
          value={value}
          onChange={(value) => {
            console.log({ value });
            setValue(value);
          }}
        />
      </div>

      <div className="grid grid-cols-4 gap-4">
        {/* Total NAV Panel Section */}
        <div className="col-span-4 lg:col-span-2">
          <TotalNavPanel />
        </div>

        {/* Allocation Breakdown */}
        <div className="col-span-4 lg:col-span-2">
          <AllocationBreakdown />
        </div>

        {/* Allocation (A), (B), (C) */}
        <div className="col-span-4 lg:col-span-1">
          {/* <Card className="h-full">
            <CardContent>Allocation A</CardContent>
          </Card> */}
          <AllocationA />
        </div>
        <div className="col-span-4 lg:col-span-1">
          <AllocationB />
        </div>
        <div className="col-span-4 lg:col-span-1">
          <AllocationC />
        </div>

        {/* Daily Report - spans 2 rows */}
        <div className="col-span-4 lg:col-span-1 row-span-2">
          <DailyReport />
        </div>

        {/* Asset Performance Panel */}
        <div className="col-span-4 lg:col-span-3">
          <AssetPerformancePanel />
        </div>

        {/* System Status */}
        <div className="col-span-4 lg:col-span-3">
          <Card className="h-full">
            <CardContent>System Status</CardContent>
          </Card>
        </div>

        {/* From the news */}
        <div className="col-span-4 lg:col-span-1">
          <FromTheNews />
        </div>
      </div>
    </section>
  );
}
