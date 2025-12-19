'use server';

import { Holding } from "./types";

export async function deletePortfolio(id: string) {
  console.log(`You clicked on delete for portfolio ${id}`);
}

export async function getCurrentPriceMap(holdings: Holding[]) {
  const tickers = holdings.map((h) => h.ticker);
  const prices = await Promise.all(
    tickers.map(async (t) => await fetch(`http://localhost:8000/api/price?symbol=${t}`)
      .then((res) => res.json()))
  );

  return new Map(prices.map((p) => [p.symbol, p.current_price]));
}