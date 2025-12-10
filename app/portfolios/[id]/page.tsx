import { portfolios, allHoldings } from "@/lib/placeholder-data";
import { Holding } from "@/lib/types";
import { quattrocento } from "@/ui/fonts";
import { AddHoldingButton } from "@/ui/portfolio/add-holding";
import { BackToPortfolios } from "@/ui/portfolio/buttons";
import { notFound } from "next/navigation";
import PortfolioContent from "./PortfolioContent";

function getTickers(holdings: Holding[]) {
  return holdings.map((h) => h.ticker);
}

async function getInitialPriceMap(holdings: Holding[]) {
  const tickers = holdings.map((h) => h.ticker);
  const prices = await Promise.all(
    tickers.map(async (t) => await fetch(`http://localhost:8000/api/price?symbol=${t}`)
      .then((res) => res.json()))
  );

  return new Map(prices.map((p) => [p.symbol, p.current_price]));
}

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;

  const portfolio = portfolios.find((p) => p.id === id);
  const holdings = allHoldings.filter((h) => h.portfolio_id === id);

  const tickers = getTickers(holdings);

  const initialPriceMap = await getInitialPriceMap(holdings);
  console.log(holdings);
  console.log(tickers);

  console.log(initialPriceMap);

  if (!portfolio) {
    notFound();
  }
  
  return (
    <div className="w-[60vw] mx-auto text-left mt-[5vh]">
      <div className="flex items-center justify-between mb-[5vh]">
        <h1 className={`text-4xl font-bold ${quattrocento.className}`}>{portfolio.name}</h1>

        <BackToPortfolios />
      </div>

      <PortfolioContent 
        portfolio={portfolio}
        holdings={holdings}
        initialPriceMap={initialPriceMap}
      />

      <AddHoldingButton />
    </div>
  );
}
