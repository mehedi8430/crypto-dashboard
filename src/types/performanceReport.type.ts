export type TPerformanceReportCard = {
  date: string;
  deception: string;
  startingNAV: string;
  endingNAV: string;
  growthRate: {
    value: number;
    sign: "+" | "-";
    color: "green" | "red";
    formatted: string;
  };
};

export type TPerformanceRecord = {
  date: string;
  balance: string;
  dailyChange: string;
  percentChange: string;
  notes: string;
}
