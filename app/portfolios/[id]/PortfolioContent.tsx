'use client';

import { useState } from "react";

import { Holding, Portfolio, PriceMap } from "@/lib/types";
import Holdings from "@/ui/portfolio/holdings-table";
import Valuation from "@/ui/portfolio/valuation";

type PortfolioContentProps = {
  portfolio: Portfolio;
  holdings: Holding[];
  initialPriceMap: PriceMap;
}

export default function PortfolioContent({ portfolio, holdings, initialPriceMap }: PortfolioContentProps) {
  const [priceMap, setPriceMap] = useState<PriceMap>(initialPriceMap);

  return (
    <>
      {/* Valuation gets setPrices and can trigger refresh */}
      <div className="mb-[5vh]">
        <Valuation
          portfolio={portfolio}
          holdings={holdings}
          priceMap={priceMap}
          setPriceMapAction={setPriceMap}
        />
      </div>

      {/* Holdings automatically receives updated prices */}
      <div className="mb-[5vh]">
        <Holdings
          holdings={holdings}
          priceMap={priceMap}
        />
      </div>
    </>
  );
}
