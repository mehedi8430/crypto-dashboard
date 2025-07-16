export type TNavChartData = {
  id: string;
  date: string; // ISO date string (e.g., "2025-07-16")
  endingNav: number;
  startingNav: number;
  growthPercent: number;
  lastUpdated: string; // ISO datetime string (e.g., "2025-07-16T18:37:34.281Z")
  datetime: string; // ISO datetime string (e.g., "2025-07-16T18:37:34.281Z")
  minuteKey: string;
};
