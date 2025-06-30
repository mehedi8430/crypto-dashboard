import { cn } from "@/lib/utils";
import React from "react";

interface AllocationMetricsPanelProps {
  allocation: "a" | "b" | "c";
}

// Data for the panels, derived from the images and demo code
const panelData = {
  a: {
    bandAssignment: { text: "Expansion", colorKey: "blue" },
    routingStrategy: { text: "Dynamic", colorKey: "blue" },
    overrideStatus: { text: "Inactive", colorKey: "green" },
    overrideBadge: null,
  },
  b: {
    bandAssignment: { text: "Expansion", colorKey: "emerald" },
    routingStrategy: { text: "Dynamic", colorKey: "blue" },
    overrideStatus: { text: "Inactive", colorKey: "green" },
    overrideBadge: null,
  },
  c: {
    bandAssignment: { text: "Override", colorKey: "yellow" },
    routingStrategy: { text: "Override Driven", colorKey: "yellow" },
    overrideStatus: { text: "Active +1.25%", colorKey: "yellow" },
    overrideBadge: "Override Active",
  },
};

// Tailwind CSS classes for different colors to be used in the panel
const colorStyles: { [key: string]: string } = {
  blue: "bg-blue-600/10 text-blue-600 outline-blue-600",
  green: "bg-green-600/10 text-green-600 outline-green-600",
  emerald: "bg-emerald-500/10 text-emerald-500 outline-emerald-500",
  yellow: "bg-yellow-400/10 text-yellow-400 outline-yellow-400",
};

// A reusable card component for individual metrics
const MetricCard: React.FC<{ title: string; value: string; colorKey: string }> = ({ title, value, colorKey }) => {
  return (
    <div className="flex-1 space-y-1.5">
      <p className="text-sm text-foreground">{title}</p>
      <div className={cn("w-full p-2.5 rounded-lg outline outline-1 outline-offset-[-1px]", colorStyles[colorKey])}>
        <p className="text-base font-medium">{value}</p>
      </div>
    </div>
  );
};

// A reusable card component for date information
const DateCard: React.FC<{ title: string; date: string }> = ({ title, date }) => (
  <div className="flex-1 space-y-1.5">
    <p className="text-sm text-foreground">{title}</p>
    <div className="w-full p-2.5  bg-(--input) rounded-lg outline outline-1 outline-offset-[-1px] outline-neutral-700">
      <p className="text-base font-normal text-foreground">{date}</p>
    </div>
  </div>
);


export const AllocationMetricsPanel: React.FC<AllocationMetricsPanelProps> = ({ allocation }) => {
  const data = panelData[allocation];
  if (!data) return null;

  return (
    <div className="flex flex-col gap-5 text-foreground mt-4">
      {/* Panel Header */}
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold">Allocation Metrics Panel</h3>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span>$129,170.88</span>
            <div className="w-1 h-1 bg-zinc-400 rounded-full" />
            <span>+0.39% today</span>
          </div>
        </div>
        {data.overrideBadge && (
          <div className="px-2 py-1 bg-yellow-400/20 rounded-[5px]">
            <p className="text-base font-medium text-yellow-400">{data.overrideBadge}</p>
          </div>
        )}
      </div>

      {/* Panel Body */}
      <div className="space-y-5">
        <div className="flex flex-col md:flex-row gap-5">
            <MetricCard title="Band Assignment" value={data.bandAssignment.text} colorKey={data.bandAssignment.colorKey} />
            <MetricCard title="Routing Strategy" value={data.routingStrategy.text} colorKey={data.routingStrategy.colorKey} />
            <MetricCard title="Override status" value={data.overrideStatus.text} colorKey={data.overrideStatus.colorKey} />
        </div>
        <div className="flex flex-col md:flex-row gap-5">
            <DateCard title="$ Last payout Event" date="06/17/2025, 09:15 AM" />
            <DateCard title="$ Next Unlock Epoch" date="07/20/2025, 04:00 PM" />
        </div>
      </div>
    </div>
  );
}