'use server';

import postgres from 'postgres';
import { Holding, Portfolio } from './types';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function fetchPortfolios(userId: string | null = null) {
  try {
    let results;

    if (userId) {
      results = await sql<Portfolio[]>`
      SELECT * from portfolios
      WHERE user_id = ${ userId }`;
    } else {
      results = await sql<Portfolio[]>`
      SELECT * from portfolios
      WHERE user_id IS NULL`;
    }

    console.log(results);

    return results as Portfolio[];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch portfolios data.');
  }
}

export async function fetchPortfolioById(portfolioId: string, userId: string | null = null) {
  try {
    let results;

    if (userId) {
      results = await sql<Portfolio[]>`
      SELECT * from portfolios
      WHERE id = ${ portfolioId } AND user_id = ${ userId }`;
    } else {
      results = await sql<Portfolio[]>`
      SELECT * from portfolios
      WHERE id = ${ portfolioId } AND user_id IS NULL`;
    }

    console.log(results);

    if (results.count === 1) {
      return results[0] as Portfolio;
    } else if (results.count === 0) {
      return null;
    }
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error(`Failed to fetch data for portfolio with id = ${portfolioId}.`);
  }

  throw new Error(`Unexpected results for fetching portfolio with id = ${portfolioId}.`)
}

export async function fetchHoldings(userId: string | null = null) {
  try {
    let results;
    if (userId) {
      results = await sql<Holding[]>`
      SELECT * from holdings
      WHERE portfolio_id IN
        (SELECT id FROM portfolios WHERE user_id = ${ userId })`;
    } else {
      results = await sql<Holding[]>`
      SELECT * from holdings
      WHERE  portfolio_id IN
        (SELECT id FROM portfolios WHERE user_id IS NULL)`;
    }

    console.log(results);

    return results as Holding[];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch holdings data.');
  }
}

export async function fetchHoldingsByPortfolioId(portfolioId: string, userId: string | null = null) {
  try {
    let results;
    if (userId) {
      results = await sql<Holding[]>`
      SELECT h.*
      FROM holdings h
      JOIN portfolios p ON p.id = h.portfolio_id
      WHERE h.portfolio_id = ${ portfolioId }
        AND p.user_id = ${ userId }`;
    } else {
      results = await sql<Holding[]>`
      SELECT h.*
      FROM holdings h
      JOIN portfolios p ON p.id = h.portfolio_id
      WHERE h.portfolio_id = ${ portfolioId }
        AND p.user_id IS NULL`;
    }

    console.log(results);

    return results as Holding[];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch holdings data.');
  }
}
