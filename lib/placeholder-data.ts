import { Holding, Portfolio } from "./types";

export const portfolios: Portfolio[] = [
  {id: "1", name: "Portfolio 1", value: 1000},
  {id: "2", name: "Portfolio 2", value: 2000},
  {id: "3", name: "Portfolio 3", value: 3000}
];

export const allHoldings: Holding[] = [
  {id: "101", portfolio_id: "1", ticker: "AAPL", quantity: 10},
  {id: "102", portfolio_id: "1", ticker: "MSFT", quantity: 10},
  {id: "103", portfolio_id: "1", ticker: "GOOGL", quantity: 10},
  {id: "201", portfolio_id: "2", ticker: "AAPL", quantity: 20},
  {id: "202", portfolio_id: "2", ticker: "AMZN", quantity: 20},
  {id: "203", portfolio_id: "2", ticker: "NVDA", quantity: 20},
  {id: "301", portfolio_id: "3", ticker: "AAPL", quantity: 30},
  {id: "302", portfolio_id: "3", ticker: "META", quantity: 30},
  {id: "303", portfolio_id: "3", ticker: "JPM", quantity: 30},
  {id: "304", portfolio_id: "3", ticker: "FDX", quantity: 30}
];
