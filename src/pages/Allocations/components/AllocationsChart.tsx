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

// Data for each allocation, based on the provided images
const allocationData = {
  a: {
    color: "#0867ED", // Blue
    data: [
      { date: "Jan 01", performance: 1400500 },
      { date: "Jan 02", performance: 1401000 },
      { date: "Jan 03", performance: 1400000 },
      { date: "Jan 04", performance: 1401200 },
      { date: "Jan 05", performance: 1400800 },
      { date: "Jan 06", performance: 1401500 },
      { date: "Jan 07", performance: 1402000 },
      { date: "Jan 08", performance: 1401000 },
      { date: "Jan 09", performance: 1401800 },
      { date: "Jan 10", performance: 1401500 },
      { date: "Jan 11", performance: 1401700 },
      { date: "Jan 12", performance: 1400500 },
      { date: "Jan 13", performance: 1400000 },
      { date: "Jan 14", performance: 1400200 },
      { date: "Jan 15", performance: 1400800 },
    ],
  },
  b: {
    color: "#00CA72", // Green
    data: [
      { date: "Jan 01", performance: 1398000 },
      { date: "Jan 02", performance: 1400000 },
      { date: "Jan 03", performance: 1399000 },
      { date: "Jan 04", performance: 1401000 },
      { date: "Jan 05", performance: 1402500 },
      { date: "Jan 06", performance: 1402800 },
      { date: "Jan 07", performance: 1401000 },
      { date: "Jan 08", performance: 1400000 },
      { date: "Jan 09", performance: 1400500 },
      { date: "Jan 10", performance: 1400200 },
      { date: "Jan 11", performance: 1400000 },
      { date: "Jan 12", performance: 1399000 },
      { date: "Jan 13", performance: 1401500 },
      { date: "Jan 14", performance: 1402000 },
      { date: "Jan 15", performance: 1403000 },
    ],
  },
  c: {
    color: "#F2C916", // Yellow
    data: [
      { date: "Jan 01", performance: 1400200 },
      { date: "Jan 02", performance: 1401000 },
      { date: "Jan 03", performance: 1398000 },
      { date: "Jan 04", performance: 1399000 },
      { date: "Jan 05", performance: 1401000 },
      { date: "Jan 06", performance: 1402000 },
      { date: "Jan 07", performance: 1401500 },
      { date: "Jan 08", performance: 1399500 },
      { date: "Jan 09", performance: 1401200 },
      { date: "Jan 10", performance: 1399800 },
      { date: "Jan 11", performance: 1398500 },
      { date: "Jan 12", performance: 1400000 },
      { date: "Jan 13", performance: 1401800 },
      { date: "Jan 14", performance: 1402500 },
      { date: "Jan 15", performance: 1401000 },
    ],
  },
};

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ value: number; payload: { date: string } }>;
  label?: string;
  color?: string;
}

const CustomTooltip = ({ active, payload, label, color }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background/80 backdrop-blur-sm p-3 border border-border rounded-lg shadow-xl">
        <p className="text-sm font-bold text-foreground">{label}</p>
        <p className="text-sm" style={{ color: color || "var(--chart-blue)" }}>
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

export default function AllocationsChart({ allocation }: { allocation: "a" | "b" | "c" | null }) {
  if (!allocation) {
    return null; // Or a fallback UI
  }

  const { data: chartData, color: chartColor } = allocationData[allocation];

  const values = chartData.map((d) => d.performance);
  const minValue = Math.min(...values);
  const maxValue = Math.max(...values);
  const padding = (maxValue - minValue) * 0.1;

  const gradientId = `fillPerformance-${allocation}`;

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
                <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
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
                content={<CustomTooltip color={chartColor} />}
              />

              <Area
                type="monotone"
                dataKey="performance"
                stroke={chartColor}
                strokeWidth={2}
                fill={`url(#${gradientId})`}
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