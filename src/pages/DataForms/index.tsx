import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Pen, X } from "lucide-react";
import TotalNavPanel from "@/pages/Home/components/TotalNavPanel";
import AllocationBreakdown from "@/pages/Home/components/AllocationBreakdown";
import AllAllocationCard from "@/pages/Home/components/AllAllocationCard";
import AssetPerformancePanel from "@/pages/Home/components/AssetPerformancePanel";
import SystemStatus from "@/pages/Home/components/SystemStatus";
import TotalNavForm from "./components/TotalNavForm";
import AllocationBreakdownForm from "./components/AllocationBreakdownForm";
import AllocationsForm from "./components/AllocationsForm";
import DailyReportForm from "./components/DailyReportForm";
import SystemStatusForm from "./components/SystemStatusForm";

export default function DataForms() {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="bg-background text-foreground p-4 sm:p-6 lg:p-8">
      <div className="mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Admin Dashboard - Manage Data</h1>
          <Button
            onClick={() => setIsEditing(!isEditing)}
            size="icon"
            variant="outline"
          >
            {!isEditing ? (
              <Pen className="h-4 w-4" />
            ) : (
              <X className="h-4 w-4" />
            )}
          </Button>
        </div>

        {isEditing ? (
          <div className="space-y-8">
            <div className="grid grid-cols-4 gap-4 max-lg:py-2">
              {/* Total NAV Panel Section */}
              <div className="col-span-4 lg:col-span-3">
                <TotalNavForm />
              </div>

              {/* Allocation Breakdown */}
              <div className="col-span-4 lg:col-span-1">
                <AllocationBreakdownForm />
              </div>
              {/* Allocation (A), (B), (C), (D) */}
              <div className="col-span-4">
                <AllocationsForm />
              </div>

              {/* Asset Performance Panel */}
              <div className="col-span-4">
                <DailyReportForm />
              </div>

              {/* System Status */}
              <div className="col-span-4">
                <SystemStatusForm />
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-4 max-lg:py-2">
            {/* Total NAV Panel Section */}
            <div className="col-span-4 lg:col-span-3">
              <TotalNavPanel />
            </div>

            {/* Allocation Breakdown */}
            <div className="col-span-4 lg:col-span-1">
              <AllocationBreakdown />
            </div>

            {/* Allocation (A), (B), (C), (D) */}
            <AllAllocationCard />

            {/* Asset Performance Panel */}
            <div className="col-span-4">
              <AssetPerformancePanel />
            </div>

            {/* System Status */}
            <div className="col-span-4">
              <Card className="h-full">
                <CardContent>
                  <SystemStatus />
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
