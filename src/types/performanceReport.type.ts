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