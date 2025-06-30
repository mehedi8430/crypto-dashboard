import { Link } from "react-router";
import Allocation from "./Allocation";

const allocationData = [
  {
    label: "A",
    startingBalance: 236903.03,
    endingBalance: 237827.95,
    gainPercent: 0.39,
    chartData: [
      { day: "Mon", value: 234000 },
      { day: "Tue", value: 335500 },
      { day: "Wed", value: 636200 },
      { day: "Thu", value: 338800 },
      { day: "Fri", value: 237000 },
      { day: "Sat", value: 637400 },
      { day: "Sun", value: 297827.95 },
    ],
    chartConfig: {
      desktop: {
        label: "value",
        color: "#0867ED",
      },
    },
  },
  {
    label: "B",
    startingBalance: 126000,
    endingBalance: 130000,
    gainPercent: -3.17,
    chartData: [
      { day: "Mon", value: 610000 },
      { day: "Tue", value: 125000 },
      { day: "Wed", value: 328000 },
      { day: "Thu", value: 529000 },
      { day: "Fri", value: 130000 },
      { day: "Sat", value: 430000 },
      { day: "Sun", value: 230000 },
    ],
    chartConfig: {
      desktop: {
        label: "value",
        color: "#12BE73",
      },
    },
  },
  {
    label: "C",
    startingBalance: 500000,
    endingBalance: 470000,
    gainPercent: 6.0,
    chartData: [
      { day: "Mon", value: 510000 },
      { day: "Tue", value: 500000 },
      { day: "Wed", value: 180000 },
      { day: "Thu", value: 470000 },
      { day: "Fri", value: 470000 },
      { day: "Sat", value: 170000 },
      { day: "Sun", value: 370000 },
    ],
    chartConfig: {
      desktop: {
        label: "value",
        color: "#F2C916",
      },
    },
  },
];

export default function AllAllocationCard() {
  return (
    <>
      {allocationData.map((item) => (
        <Link
          to={`/dashboard/allocations/${item.label.toLowerCase()}`}
          className="col-span-4 lg:col-span-1"
        >
          <Allocation
            key={item.label}
            label={item.label}
            startingBalance={item.startingBalance}
            endingBalance={item.endingBalance}
            gainPercent={item.gainPercent}
            chartData={item.chartData}
            chartConfig={item.chartConfig}
          />
        </Link>
      ))}
    </>
  );
}
