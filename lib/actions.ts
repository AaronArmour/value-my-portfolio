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

export async function isTickerValid(ticker: string) {
  try {
    const data = await fetchJson<{
      symbol: string;
      valid: boolean;
      current_price: number | null;
    }>(`http://localhost:8000/api/check_symbol?symbol=${ticker}`);

    return data?.valid;
  } catch (error) {
    console.error('Error checking ticker validity:', error);
    throw new Error('Failed to check ticker validity.');
  }
}

export async function addHolding(ticker: string, quantity: number, portfolioId: string, 
  userId: string | null = null) {
  // TODO: need to add validation that userId owns this portfolio/holding before proceeding
  if (quantity <= 0) throw new Error('Quantity must be positive.');

  try {
    await sql`
    INSERT INTO holdings (ticker, quantity, portfolio_id)
    VALUES (${ ticker }, ${ quantity }, ${ portfolioId });
    `;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to add new holdings data.');
  }
}

export async function removeHolding(holdingId: string, userId: string | null = null) {
  // TODO: need to add validation that userId owns this portfolio/holding before proceeding
  try {
    await sql`
    DELETE FROM holdings WHERE id = ${ holdingId }
    `;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to remove holdings data.');
  }
}
