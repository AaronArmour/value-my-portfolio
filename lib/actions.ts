'use server';

import postgres from 'postgres';
import { Holding, PriceMap } from "./types";
import { fetchJson } from "./utils";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

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

export async function updateHolding(holdingId: string, quantity: number, userId: string | null = null) {
  try {
    if (userId) {
      await sql`
      UPDATE holdings h
      SET quantity = ${quantity}
      FROM portfolios p
      WHERE p.id = h.portfolio_id
        AND h.id = ${holdingId}
        AND p.user_id = ${ userId }`;
    } else {
      await sql`
      UPDATE holdings h
      SET quantity = ${quantity}
      FROM portfolios p
      WHERE p.id = h.portfolio_id
        AND h.id = ${holdingId}
        AND p.user_id IS NULL`;
    }
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to update holdings data.');
  }
}
