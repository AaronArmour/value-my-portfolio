export type Portfolio = {
  id: string;
  name: string;
  user_id?: string | null;
  value: number;
}

export type Holding = {
  id: string;
  portfolio_id: string;
  ticker: string;
  quantity: number;
}

export type PriceMap = Map<string, number | null>;
