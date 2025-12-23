import { Holding, PriceMap } from "./types";

export function getPortfolioValue(holdings: Holding[], priceMap: PriceMap) {
  return holdings.reduce((sum, h) => {
    const price = priceMap.get(h.ticker);
    if (price == null) return sum; // skip missing prices
    return sum + price * h.quantity;
  }, 0);
}
