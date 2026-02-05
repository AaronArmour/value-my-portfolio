import { quattrocento } from "@/ui/fonts";
import { AddHoldingButton } from "@/ui/portfolio/add-holding";
import { BackToPortfolios } from "@/ui/portfolio/buttons";
import { notFound } from "next/navigation";
import PortfolioContent from "./PortfolioContent";
import { getCurrentPriceMap } from "@/lib/actions";
import { fetchHoldingsByPortfolioId, fetchPortfolioById } from "@/lib/data";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;

  const portfolio = await fetchPortfolioById(id);
  
  if (!portfolio) {
    notFound();
  }

  const holdings = await fetchHoldingsByPortfolioId(id);
  const currentPriceMap = await getCurrentPriceMap(holdings);
  
  return (
    <div className="w-[60vw] mx-auto text-left mt-[5vh]">
      <div className="flex items-center justify-between mb-[5vh]">
        <h1 className={`text-4xl font-bold ${quattrocento.className}`}>{portfolio.name}</h1>

        <BackToPortfolios />
      </div>

      <PortfolioContent 
        portfolio={portfolio}
        holdings={holdings}
        initialPriceMap={currentPriceMap}
      />

      <AddHoldingButton 
        portfolioId={id}
      />
    </div>
  );
}
