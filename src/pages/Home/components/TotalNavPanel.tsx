import { Card, CardContent } from "@/components/ui/card";

export default function TotalNavPanel() {
  return (
    <Card className="h-full">
      <CardContent>
        <div className="flex flex-col md:flex-row justify-between items-center">
          <h3 className="text-foreground/80 text-xs">
            Total NAV
            <span className="text-foreground text-[16px] font-bold ml-1">
              $35,00.00
            </span>
          </h3>

          <div className="flex items-center gap-5">
            <div className="flex flex-col items-center gap-1">
              <p className="text-primary text-xs">+0.68%</p>
              <p className="text-foreground/70 text-[10px] font-noraml">
                Total growth
              </p>
            </div>

            <div className="flex flex-col items-center gap-1">
              <p className="text-primary text-xs">+0.68%</p>
              <p className="text-foreground/70 text-[10px] font-noraml">
                Total growth
              </p>
            </div>

            <div>Input Field</div>
          </div>
        </div>

        {/* Chart */}
        <div className="mt-6">{/* <TotalNavChart /> */}</div>
      </CardContent>
    </Card>
  );
}