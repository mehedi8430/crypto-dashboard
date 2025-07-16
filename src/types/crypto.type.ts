export type TNavChartData = {
  id: string;
  date: string;
  endingNav: number;
  startingNav: number;
  growthPercent: number;
  lastUpdated: string;
  datetime: string;
  minuteKey: string;
};

export type TAllocationHistory = {
  minuteKey: string;
  starting_balance: number;
  minute_gain: number;
  minute_gain_percent: number;
  ending_balance: number;
  notes: string;
  createdAt: string;
};
