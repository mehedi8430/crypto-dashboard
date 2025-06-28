import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SelectInput from "@/components/SelectInput";
import type { Allocation } from "@/types/allocation.type";
import AllocationChart from "./AllocationChart";

const aColor = "var(--color-piechart-a)";
const bColor = "var(--color-piechart-b)";
const cColor = "var(--color-piechart-c)";

const chartData: Allocation[] = [
  { name: "A", value: 41.5, fill: aColor },
  { name: "B", value: 35.1, fill: bColor },
  { name: "C", value: 26.5, fill: cColor },
];

export default function AllocationBreakdown() {
  return (
    <Card className="h-auto">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Allocation Breakdown</CardTitle>
        <SelectInput />
      </CardHeader>
      <CardContent className="flex flex-col md:flex-row items-center justify-around">
        {/* Data Legend */}
        <div className="flex flex-col gap-4 mb-4 md:mb-0">
          {chartData.map((item) => (
            <div key={item.name} className="flex items-center gap-4">
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: item.fill }}
              />
              <div className="text-xl font-medium">{item.name}</div>
              <div className="text-xl font-medium">{item.value}%</div>
            </div>
          ))}
        </div>
        <AllocationChart data={chartData} />
      </CardContent>
    </Card>
  );
}