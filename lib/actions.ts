'use server';

import { Holding, PriceMap } from "./types";
import { fetchJson } from "./utils";

export async function deletePortfolio(id: string) {
  console.log(`You clicked on delete for portfolio ${id}`);
}

export async function getCurrentPriceMap(
  holdings: Holding[]
): Promise<PriceMap> {
  const results = await Promise.allSettled(
    holdings.map(async (h) => {
      const data = await fetchJson<{
        symbol: string;
        current_price?: number;
      }>(`http://localhost:8000/api/price?symbol=${h.ticker}`);

      return {
        ticker: h.ticker,
        price: data?.current_price ?? null,
      };
    })
  );

  const priceMap: PriceMap = new Map();

  for (const result of results) {
    if (result.status === "fulfilled") {
      priceMap.set(result.value.ticker, result.value.price);
    }
  }

  return priceMap;
}


export async function getHistoricalPriceMap(
  holdings: Holding[],
  date: Date
): Promise<PriceMap> {
  const dateOnly = date.toISOString().split("T")[0];

  const results = await Promise.allSettled(
    holdings.map(async (h) => {
      const data = await fetchJson<{
        symbol: string;
        historical_price?: number;
      }>(
        `http://localhost:8000/api/price?symbol=${h.ticker}&date=${dateOnly}`
      );

      return {
        ticker: h.ticker,
        price: data?.historical_price ?? null,
      };
    })
  );

  const priceMap: PriceMap = new Map();

  for (const result of results) {
    if (result.status === "fulfilled") {
      priceMap.set(result.value.ticker, result.value.price);
    }
  }

  return priceMap;
}
