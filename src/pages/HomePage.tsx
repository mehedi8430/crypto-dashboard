import { Card, CardContent } from "@/components/ui/card";

export default function HomePage() {
  return (
    <section className="px-4">
      <div className="grid grid-cols-4 gap-4">
        {/* Total NAV Panel */}
        <div className="col-span-2">
          <Card>
            <CardContent>Total NAV Panel</CardContent>
          </Card>
        </div>

        {/* Allocation Breakdown */}
        <div className="col-span-2">
          <Card>
            <CardContent>Allocation Breakdown</CardContent>
          </Card>
        </div>

        {/* Allocation (A), (B), (C) */}
        <div className="col-span-1">
          <Card>
            <CardContent>Allocation A</CardContent>
          </Card>
        </div>
        <div className="col-span-1">
          <Card>
            <CardContent>Allocation B</CardContent>
          </Card>
        </div>
        <div className="col-span-1">
          <Card>
            <CardContent>Allocation C</CardContent>
          </Card>
        </div>

        {/* Daily Report - spans 2 rows */}
        <div className="col-span-1 row-span-2">
          <Card className="h-full">
            <CardContent>Daily Report</CardContent>
          </Card>
        </div>

        {/* Asset Performance Panel */}
        <div className="col-span-3">
          <Card>
            <CardContent>Asset Performance Panel</CardContent>
          </Card>
        </div>

        {/* System Status */}
        <div className="col-span-3">
          <Card>
            <CardContent>System Status</CardContent>
          </Card>
        </div>

        {/* From the news */}
        <div className="col-span-1">
          <Card>
            <CardContent>From the news</CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
