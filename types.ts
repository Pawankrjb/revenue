export interface User {
  username: string;
  name: string;
  avatarUrl?: string;
}

export interface InsightState {
  message: string;
  loading: boolean;
  error: string | null;
}

export interface ChartDataPoint {
  name: string;
  value: number;
  revenue: number;
}
