import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const chartData = [
  { date: "Jan 01", performance: 1400004 },
  { date: "Jan 02", performance: 1400006 },
  { date: "Jan 03", performance: 1400005 },
  { date: "Jan 04", performance: 1400007 },
  { date: "Jan 05", performance: 1400005 },
  { date: "Jan 06", performance: 1400006 },
  { date: "Jan 07", performance: 1400009 },
  { date: "Jan 08", performance: 1400006 },
  { date: "Jan 09", performance: 1400008 },
  { date: "Jan 10", performance: 1400006 },
  { date: "Jan 11", performance: 1400007 },
  { date: "Jan 12", performance: 1400005 },
  { date: "Jan 13", performance: 1400004 },
  { date: "Jan 14", performance: 1400005 },
  { date: "Jan 15", performance: 1400006 },
];

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ value: number; payload: { date: string } }>;
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background/80 backdrop-blur-sm p-3 border border-border rounded-lg shadow-xl">
        <p className="text-sm font-bold text-foreground">{label}</p>
        <p className="text-sm" style={{ color: "var(--chart-blue)" }}>
          Performance:{" "}
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          }).format(payload[0].value)}
        </p>
      </div>
    );
  }
  return null;
};

export default function AllocationsChart() {
  const values = chartData.map((d) => d.performance);
  const minValue = Math.min(...values);
  const maxValue = Math.max(...values);
  const padding = (maxValue - minValue) * 0.1;

  const chartColor = "var(--chart-blue)";

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>30-day performance Trends</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full h-[250px]">
          <ResponsiveContainer width="100%" height="100%" >
            <AreaChart
              data={chartData}
              margin={{ top: 10, right: 30, left: 30, bottom: 0 }}
            >
              <defs>
                <linearGradient id="fillPerformance" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={chartColor} stopOpacity={0.4} />
                  <stop offset="95%" stopColor={chartColor} stopOpacity={0.1} />
                </linearGradient>
              </defs>

              <CartesianGrid
                vertical={false}
                stroke="var(--border)"
                strokeOpacity={0.5}
              />

              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={10}
                tick={{ fill: "var(--muted-foreground)" }}
              />

              <YAxis
                domain={[minValue - padding, maxValue + padding]}
                axisLine={false}
                tickLine={false}
                tickMargin={10}
                tick={{ fill: "var(--muted-foreground)" }}
                tickFormatter={(value) =>
                  new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                    notation: "compact",
                    compactDisplay: "short",
                  }).format(value)
                }
              />

              <Tooltip
                cursor={{
                  stroke: chartColor,
                  strokeWidth: 1,
                  strokeOpacity: 0.5,
                  strokeDasharray: "5 3",
                }}
                content={<CustomTooltip />}
              />

              <Area
                type="monotone"
                dataKey="performance"
                stroke={chartColor}
                strokeWidth={2}
                fill="url(#fillPerformance)"
                activeDot={{
                  r: 6,
                  fill: chartColor,
                  stroke: "var(--card)",
                  strokeWidth: 2,
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}