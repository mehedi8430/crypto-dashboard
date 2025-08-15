export type TCoinData = {
  image: string;
  name: string;
  symbol: string;
  open: number;
  close: number;
  change: number;
  volume: number;
  volumeTrend: "up" | "down";
};
