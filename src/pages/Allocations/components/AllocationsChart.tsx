import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp } from 'lucide-react';

// --- Chart Data ---
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

// --- UI Components ---
interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card = ({ children, className = '' }: CardProps) => (
  <div className={`w-full rounded-lg shadow-lg text-white ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children }: { children: React.ReactNode }) => (
  <div className="p-6">{children}</div>
);

const CardTitle = ({ children }: { children: React.ReactNode }) => (
  <h3 className="text-lg font-semibold tracking-tight">{children}</h3>
);

const CardDescription = ({ children }: { children: React.ReactNode }) => (
  <p className="text-sm text-gray-400 mt-1">{children}</p>
);

const CardContent = ({ children }: { children: React.ReactNode }) => (
  <div className="p-6 pt-0">{children}</div>
);

const CardFooter = ({ children }: { children: React.ReactNode }) => (
  <div className="p-6 pt-0">{children}</div>
);

// --- Tooltip Props ---
interface TooltipProps {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string;
}

// --- Main Chart Component ---
export default function AllocationA() {
  // --- Custom Tooltip Component ---
  const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-900/80 backdrop-blur-sm p-3 border border-gray-700 rounded-lg shadow-xl">
          <p className="text-sm font-bold text-gray-200">{label}</p>
          <p className="text-sm text-blue-400">
            Performance: {new Intl.NumberFormat('en-US', { 
              style: 'currency', 
              currency: 'USD', 
              minimumFractionDigits: 0, 
              maximumFractionDigits: 0 
            }).format(payload[0].value)}
          </p>
        </div>
      );
    }
    return null;
  };

  // Calculate min and max values for YAxis domain
  const values = chartData.map(d => d.performance);
  const minValue = Math.min(...values);
  const maxValue = Math.max(...values);
  const padding = (maxValue - minValue) * 0.1; // 10% padding

  return (
    <Card className="bg-gray-800">
      <CardHeader>
        <CardTitle>Allocation A</CardTitle>
        <CardDescription>
          Showing performance data for the first 15 days of January
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="w-full h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart 
              data={chartData} 
              margin={{ top: 10, right: 30, left: 30, bottom: 0 }}
            >
              <defs>
                <linearGradient id="fillPerformance" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              
              <CartesianGrid 
                vertical={false} 
                stroke="#374151"
                strokeOpacity={0.3}
              />
              
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={10}
                tick={{ fill: '#9ca3af' }}
              />
              
              <YAxis
                domain={[minValue - padding, maxValue + padding]}
                axisLine={false}
                tickLine={false}
                tickMargin={10}
                tick={{ fill: '#9ca3af' }}
                tickFormatter={(value) => 
                  new Intl.NumberFormat('en-US', { 
                    style: 'currency', 
                    currency: 'USD', 
                    notation: 'compact', 
                    compactDisplay: 'short' 
                  }).format(value)
                }
              />
              
              <Tooltip
                cursor={{ 
                  stroke: '#3b82f6', 
                  strokeWidth: 1, 
                  strokeOpacity: 0.5,
                  strokeDasharray: '5 3'
                }}
                content={<CustomTooltip />}
              />
              
              <Area
                type="monotone"
                dataKey="performance"
                stroke="#3b82f6"
                strokeWidth={2}
                fill="url(#fillPerformance)"
                activeDot={{
                  r: 6,
                  fill: '#3b82f6',
                  stroke: '#fff',
                  strokeWidth: 2,
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 leading-none font-medium text-blue-400">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="text-gray-400 flex items-center gap-2 leading-none">
              January 01 - January 15, 2024
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}