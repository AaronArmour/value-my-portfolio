import { quattrocento } from "@/ui/fonts";
import { CreatePortfolio } from "@/ui/portfolios/buttons";
import { PortfolioTable } from "@/ui/portfolios/portfolio-table";
import { allHoldings, portfolios } from "@/lib/placeholder-data";
import { getCurrentPriceMap } from "@/lib/actions";
import { getPortfolioValue } from "@/lib/portfolio";

export default async function Page() {
  const currentPriceMap = await getCurrentPriceMap(allHoldings);

  portfolios.forEach((portfolio) => {
    const holdings = allHoldings.filter((h) => h.portfolio_id === portfolio.id);
    portfolio.value = getPortfolioValue(holdings, currentPriceMap);
  });
  
  return (
    <div className="w-[60vw] mx-auto text-left mt-[5vh]">
      <h1 className={`text-4xl font-bold mb-[5vh] ${quattrocento.className}`}>Portfolios page</h1>

      <div className="mb-[5vh]">
        <PortfolioTable portfolios={portfolios} />
      </div>
      
      <CreatePortfolio />
    </div>
  );
}
