import { Holding, PriceMap } from "./types";

export function getPortfolioValue(holdings: Holding[], priceMap: PriceMap) {
  let value = 0;
  holdings.forEach((h) => {
    value += h.quantity * priceMap.get(h.ticker)! // TODO: be more careful and add error checking
  });

  return value;
}