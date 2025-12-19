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

export async function getHistoricalPriceMap(holdings: Holding[], date: Date) {
  const tickers = holdings.map((h) => h.ticker);
  const isoString = date.toISOString();
  const dateOnly = isoString.slice(0, isoString.indexOf('T'));

  const prices = await Promise.all(
    tickers.map(async (t) => await fetch(`http://localhost:8000/api/price?symbol=${t}&date=${dateOnly}`)
      .then((res) => res.json()))
  );

  return new Map(prices.map((p) => [p.symbol, p.historical_price]));
}
