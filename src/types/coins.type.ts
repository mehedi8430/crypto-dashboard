export type TCoinData = {
  name: string;
  symbol: string;
  open: string;
  close: string;
  change: string;
  volume: string;
  volumeTrend: 'up' | 'down';
};