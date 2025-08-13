/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
} from "@/components/ui/chart";
import { useEffect, useState } from "react";
import Loader from "@/components/Loader";
import { useCryptoChartData } from "@/pages/hooks";
import type { TNavChartData } from "@/types";

const chartConfig = {
  total_nav: {
    label: "Total Nav",
    color: "var(--color-chart-1)",
  },
} satisfies ChartConfig;

interface TotalNavChartProps {
  selectedMonth?: string;
  onMonthChange?: (month: string) => void;
}

type TFormattedNavChartData = {
  date: string;
  total_nav: number;
  time: string;
  day: number;
};

export default function TotalNavChart({ selectedMonth }: TotalNavChartProps) {
  const [chartData, setChartData] = useState<TFormattedNavChartData[]>([]);
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(1000);
  const [dynamicTicks, setDynamicTicks] = useState<number[]>([]);

  const currentMonth = new Date()
    .toLocaleString("default", { month: "long" })
    .toLowerCase();
  const activeMonth = selectedMonth || currentMonth;

  const {
    data: navChartData,
    loading: isPending,
    error,
    emit,
    isConnected,
  } = useCryptoChartData("http://172.16.100.26:5050");

  console.log({ navChartData, activeMonth });

  // Request data when month changes or component mounts
  useEffect(() => {
    if (isConnected) {
      const requestData = {
        month: activeMonth,
        year: new Date().getFullYear(),
      };

      console.log("Requesting chart data for:", requestData);
      emit("request_chart_data", requestData);
    }
  }, [activeMonth, isConnected, emit]);

  useEffect(() => {
    if (
      navChartData &&
      Array.isArray(navChartData) &&
      navChartData.length > 0
    ) {
      const formattedData = navChartData
        .map((d: TNavChartData) => {
          const dateField = d.datetime;
          const navField = d.nav;

          if (!dateField || navField === undefined || navField === null) {
            console.warn("Invalid data item:", d);
            return null;
          }

          return {
            date: dateField,
            total_nav: navField,
            time: new Date(dateField).toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            }),
            day: new Date(dateField).getDate(),
          };
        })
        .filter((item) => item !== null); // Remove null items

      if (formattedData.length === 0) {
        console.warn("No valid data after formatting");
        setChartData([]);
        return;
      }

      setChartData(formattedData);

      // Calculate min/max values
      const values = formattedData.map((d: any) => d.total_nav);
      const dataMin = Math.min(...values);
      const dataMax = Math.max(...values);

      // Add padding to the range
      const range = dataMax - dataMin;
      const padding = range > 0 ? range * 0.1 : dataMin * 0.1; // Handle case where all values are the same

      const newMinValue = Math.floor(dataMin - padding);
      const newMaxValue = Math.ceil(dataMax + padding);

      // Ensure we have a valid range
      const finalMinValue = newMinValue;
      const finalMaxValue =
        newMaxValue > newMinValue ? newMaxValue : newMinValue + 100;

      setMinValue(finalMinValue);
      setMaxValue(finalMaxValue);

      // Generate dynamic ticks
      const tickCount = 5;
      const tickStep = (finalMaxValue - finalMinValue) / (tickCount - 1);

      const newDynamicTicks = Array.from({ length: tickCount }, (_, i) =>
        Math.round(finalMinValue + tickStep * i)
      );

      setDynamicTicks(newDynamicTicks);
    } else {
      console.warn("Invalid navChartData:", navChartData);
    }
  }, [navChartData, activeMonth]);

  const CustomTooltipCursor = (props: any) => {
    const { points, height, payload } = props;

    if (points && points.length > 0) {
      const { x } = points[0];
      const value = payload[0]?.value;

      if (value === undefined || maxValue === minValue) return null;

      const normalizedValue = (value - minValue) / (maxValue - minValue);
      const yPosition = height - normalizedValue * height;

      return (
        <g>
          <line
            x1={x}
            y1={yPosition}
            x2={x}
            y2={height}
            stroke="var(--color-chart-1)"
            strokeWidth={3}
            strokeDasharray="5 3"
            opacity={0.7}
          />
          <circle
            cx={x}
            cy={yPosition}
            r={8}
            fill="var(--color-chart-1)"
            stroke="var(--color-chart-1)"
            strokeWidth={3}
            opacity={1}
            filter="drop-shadow(0 0 6px var(--color-chart-1))"
          />
          <circle cx={x} cy={yPosition} r={4} fill="white" opacity={1} />
        </g>
      );
    }
    return null;
  };

  const CustomTooltipContent = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const value = payload[0]?.value;
      if (value === undefined || value === null) return null;

      return (
        <div className="bg-border px-4 py-2 rounded-lg shadow-lg">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary" />
            <span className="text-sm font-bold text-foreground">
              $
              {value.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <div className="w-2 h-2 rounded-full bg-foreground" />
            <span className="text-[10px] text-foreground/70">
              {new Date(label).toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
              })}{" "}
              {payload[0]?.payload?.time ||
                new Date(label).toLocaleTimeString()}
              , {new Date(label).getFullYear()}
            </span>
          </div>
        </div>
      );
    }
    return null;
  };

  // Custom X-axis tick formatter for better month view
  const formatXAxisTick = (value: string) => {
    const date = new Date(value);

    // For monthly view, show day of month
    if (chartData.length <= 31) {
      return date.getDate().toString();
    }

    // For larger datasets, show month/day
    return date.toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
    });
  };

  if (isPending) {
    return (
      <div className="h-[230px] flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center p-4 h-[230px] flex items-center justify-center">
        <div>
          <p>Error loading chart data: {error}</p>
          <button
            onClick={() =>
              emit("request_chart_data", {
                month: activeMonth,
                year: new Date().getFullYear(),
              })
            }
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!navChartData || navChartData.length === 0) {
    return (
      <div className="text-center p-4 h-[230px] flex items-center justify-center">
        <div>
          <p>No chart data available</p>
          <button
            onClick={() =>
              emit("request_chart_data", {
                month: activeMonth,
                year: new Date().getFullYear(),
              })
            }
            className="mt-2 px-4 py-2 bg-primary text-white rounded hover:bg-primary/90"
          >
            Load Data
          </button>
        </div>
      </div>
    );
  }

  if (chartData.length === 0) {
    return (
      <div className="text-center p-4 h-[230px] flex items-center justify-center">
        <div>
          <p>
            No data available for{" "}
            {activeMonth.charAt(0).toUpperCase() + activeMonth.slice(1)}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Try selecting a different month
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <ChartContainer
        config={chartConfig}
        className="aspect-auto h-[230px] w-full"
        style={{ pointerEvents: "all" }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{
              left: 12,
              right: 12,
              top: 12,
              bottom: 12,
            }}
          >
            <defs>
              <linearGradient id="fillTotalNav" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-chart-1)"
                  stopOpacity={0.5}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-chart-1)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>

            <CartesianGrid
              vertical={false}
              strokeDasharray="3 3"
              opacity={0.3}
            />

            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              height={40}
              tick={{ fontSize: 12 }}
              tickFormatter={formatXAxisTick}
              interval="preserveStartEnd"
            />

            <YAxis
              domain={[minValue, maxValue]}
              ticks={dynamicTicks}
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12 }}
              tickMargin={8}
              width={80}
              tickFormatter={(value) => `$${value.toLocaleString()}`}
            />

            <ChartTooltip
              content={<CustomTooltipContent />}
              cursor={<CustomTooltipCursor />}
            />

            <Area
              dataKey="total_nav"
              type="monotone"
              fill="url(#fillTotalNav)"
              fillOpacity={0.4}
              stroke="var(--color-chart-1)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
}

// import {
//   Area,
//   AreaChart,
//   CartesianGrid,
//   ResponsiveContainer,
//   XAxis,
//   YAxis,
// } from "recharts";
// import {
//   type ChartConfig,
//   ChartContainer,
//   ChartTooltip,
// } from "@/components/ui/chart";
// import { useEffect, useState } from "react";
// import Loader from "@/components/Loader";
// import { useCryptoChartData } from "@/pages/hooks";
// import type { TNavChartData } from "@/types";

// const chartConfig = {
//   total_nav: {
//     label: "Total Nav",
//     color: "var(--color-chart-1)",
//   },
// } satisfies ChartConfig;

// export default function TotalNavChart() {
//   const [chartData, setChartData] = useState<TNavChartData[]>([]);
//   const [minValue, setMinValue] = useState(0);
//   const [maxValue, setMaxValue] = useState(1000);
//   const [dynamicTicks, setDynamicTicks] = useState<number[]>([]);

//   const {
//     data: navChartData,
//     loading: isPending,
//     error,
//     // isConnected: navConnected,
//   } = useCryptoChartData("http://172.16.100.26:5050");

//   console.log({ navChartData });

//   useEffect(() => {
//     if (
//       navChartData &&
//       Array.isArray(navChartData) &&
//       navChartData.length > 0
//     ) {
//       const formattedData = navChartData
//         .map((d: TNavChartData) => {
//           const dateField = d.datetime;
//           const navField = d.nav;

//           if (!dateField || navField === undefined || navField === null) {
//             console.warn("Invalid data item:", d);
//             return null;
//           }

//           return {
//             date: dateField,
//             total_nav: navField,
//             time: new Date(dateField).toLocaleTimeString("en-US", {
//               hour: "2-digit",
//               minute: "2-digit",
//               second: "2-digit",
//             }),
//           };
//         })
//         .filter(Boolean); // Remove null items

//       console.log("Formatted data:", formattedData);

//       if (formattedData.length === 0) {
//         console.warn("No valid data after formatting");
//         return;
//       }

//       setChartData(formattedData);

//       // Calculate min/max values
//       const values = formattedData.map((d: any) => d.total_nav);
//       const dataMin = Math.min(...values);
//       const dataMax = Math.max(...values);

//       console.log("Data range:", { dataMin, dataMax });

//       // Add padding to the range
//       const range = dataMax - dataMin;
//       const padding = range > 0 ? range * 0.1 : dataMin * 0.1; // Handle case where all values are the same

//       const newMinValue = Math.floor(dataMin - padding);
//       const newMaxValue = Math.ceil(dataMax + padding);

//       // Ensure we have a valid range
//       const finalMinValue = newMinValue;
//       const finalMaxValue =
//         newMaxValue > newMinValue ? newMaxValue : newMinValue + 100;

//       setMinValue(finalMinValue);
//       setMaxValue(finalMaxValue);

//       // Generate dynamic ticks
//       const tickCount = 5;
//       const tickStep = (finalMaxValue - finalMinValue) / (tickCount - 1);

//       const newDynamicTicks = Array.from({ length: tickCount }, (_, i) =>
//         Math.round(finalMinValue + tickStep * i)
//       );

//       setDynamicTicks(newDynamicTicks);
//       console.log("Chart setup:", {
//         finalMinValue,
//         finalMaxValue,
//         newDynamicTicks,
//       });
//     } else {
//       console.warn("Invalid navChartData:", navChartData);
//     }
//   }, [navChartData]);

//   const CustomTooltipCursor = (props: any) => {
//     const { points, height, payload } = props;

//     if (points && points.length > 0) {
//       const { x } = points[0];
//       const value = payload[0]?.value;

//       if (value === undefined || maxValue === minValue) return null;

//       const normalizedValue = (value - minValue) / (maxValue - minValue);
//       const yPosition = height - normalizedValue * height;

//       return (
//         <g>
//           <line
//             x1={x}
//             y1={yPosition}
//             x2={x}
//             y2={height}
//             stroke="var(--color-chart-1)"
//             strokeWidth={3}
//             strokeDasharray="5 3"
//             opacity={0.7}
//           />
//           <circle
//             cx={x}
//             cy={yPosition}
//             r={8}
//             fill="var(--color-chart-1)"
//             stroke="var(--color-chart-1)"
//             strokeWidth={3}
//             opacity={1}
//             filter="drop-shadow(0 0 6px var(--color-chart-1))"
//           />
//           <circle cx={x} cy={yPosition} r={4} fill="white" opacity={1} />
//         </g>
//       );
//     }
//     return null;
//   };

//   const CustomTooltipContent = ({ active, payload, label }: any) => {
//     if (active && payload && payload.length) {
//       const value = payload[0]?.value;
//       if (value === undefined || value === null) return null;

//       return (
//         <div className="bg-border px-4 py-2 rounded-lg shadow-lg">
//           <div className="flex items-center gap-2">
//             <div className="w-2 h-2 rounded-full bg-primary" />
//             <span className="text-sm font-bold text-foreground">
//               $
//               {value.toLocaleString("en-US", {
//                 minimumFractionDigits: 2,
//                 maximumFractionDigits: 2,
//               })}
//             </span>
//           </div>
//           <div className="flex items-center gap-2 mt-1">
//             <div className="w-2 h-2 rounded-full bg-foreground" />
//             <span className="text-[10px] text-foreground/70">
//               {new Date(label).toLocaleDateString("en-US", {
//                 weekday: "short",
//                 month: "short",
//                 day: "numeric",
//               })}{" "}
//               {payload[0]?.payload?.time ||
//                 new Date(label).toLocaleTimeString()}
//               , {new Date(label).getFullYear()}
//             </span>
//           </div>
//         </div>
//       );
//     }
//     return null;
//   };

//   if (isPending) return <Loader />;

//   if (error) {
//     return (
//       <div className="text-red-500 text-center p-4">
//         Error loading chart data: {error}
//       </div>
//     );
//   }

//   if (!navChartData || navChartData.length === 0) {
//     return <div className="text-center p-4">No chart data available</div>;
//   }

//   if (chartData.length === 0) {
//     return <div className="text-center p-4">Processing chart data...</div>;
//   }

//   return (
//     <ChartContainer
//       config={chartConfig}
//       className="aspect-auto h-[230px] w-full"
//       style={{ pointerEvents: "all" }}
//     >
//       <ResponsiveContainer width="100%" height="100%">
//         <AreaChart
//           data={chartData}
//           margin={{
//             left: 12,
//             right: 12,
//             top: 12,
//             bottom: 12,
//           }}
//         >
//           <defs>
//             <linearGradient id="fillTotalNav" x1="0" y1="0" x2="0" y2="1">
//               <stop
//                 offset="5%"
//                 stopColor="var(--color-chart-1)"
//                 stopOpacity={0.5}
//               />
//               <stop
//                 offset="95%"
//                 stopColor="var(--color-chart-1)"
//                 stopOpacity={0.1}
//               />
//             </linearGradient>
//           </defs>

//           <CartesianGrid vertical={false} strokeDasharray="3 3" opacity={0.3} />

//           <XAxis
//             dataKey="date"
//             tickLine={false}
//             axisLine={false}
//             tickMargin={8}
//             height={40}
//             tick={{ fontSize: 12 }}
//             tickFormatter={(value) => {
//               const date = new Date(value);
//               return date.toLocaleDateString("en-US", {
//                 month: "2-digit",
//                 day: "2-digit",
//                 year: "2-digit",
//               });
//             }}
//           />

//           <YAxis
//             domain={[minValue, maxValue]}
//             ticks={dynamicTicks}
//             axisLine={false}
//             tickLine={false}
//             tick={{ fontSize: 12 }}
//             tickMargin={8}
//             width={80}
//             tickFormatter={(value) => `$${value.toLocaleString()}`}
//           />

//           <ChartTooltip
//             content={<CustomTooltipContent />}
//             cursor={<CustomTooltipCursor />}
//           />

//           <Area
//             dataKey="total_nav"
//             type="monotone"
//             fill="url(#fillTotalNav)"
//             fillOpacity={0.4}
//             stroke="var(--color-chart-1)"
//             strokeWidth={2}
//           />
//         </AreaChart>
//       </ResponsiveContainer>
//     </ChartContainer>
//   );
// }
