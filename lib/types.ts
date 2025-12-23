export type Portfolio = {
  id: string;
  name: string;
  value: number;
}

export type Holding = {
  id: string;
  portfolio_id: string;
  ticker: string;
  quantity: number;
}

export type PriceMap = Map<string, number | null>;
