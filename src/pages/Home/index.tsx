import SearchInput from "@/components/SearchInput";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import TotalNavPanel from "./components/TotalNavPanel";
import AllocationBreakdown from "./components/AllocationBreakdown";
import AssetPerformancePanel from "./components/AssetPerformancePanel";
import FromTheNews from "./components/FromTheNews";
import DailyReport from "./components/DailyReport";
import SystemStatus from "./components/SystemStatus";
import AllAllocationCard from "./components/AllAllocationCard";

export default function HomePage() {
  const [value, setValue] = useState<string>("");

  return (
    <section>
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
        <AllAllocationCard />

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
          <Card className="h-max">
            <CardContent>
              <SystemStatus />
            </CardContent>
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
