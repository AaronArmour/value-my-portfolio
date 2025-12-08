import { portfolios, allHoldings } from "@/lib/placeholder-data";
import { quattrocento } from "@/ui/fonts";
import { AddHoldingButton } from "@/ui/portfolio/add-holding";
import { AddHolding, BackToPortfolios } from "@/ui/portfolio/buttons";
import Holdings from "@/ui/portfolio/holdings-table";
import Valuation from "@/ui/portfolio/valuation";
import { notFound } from "next/navigation";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;

  const portfolio = portfolios.find((p) => p.id === id);
  const holdings = allHoldings.filter((h) => h.portfolio_id === id);

  if (!portfolio) {
    notFound();
  }
  
  return (
    <div className="w-[60vw] mx-auto text-left mt-[5vh]">
      <div className="flex items-center justify-between mb-[5vh]">
        <h1 className={`text-4xl font-bold ${quattrocento.className}`}>{portfolio.name}</h1>

        <BackToPortfolios />
      </div>

      <div className="mb-[5vh]">
        <Valuation portfolio={portfolio}/>
      </div>
      
      <div className="mb-[5vh]">
        <Holdings holdings={holdings}/>
      </div>

      <AddHoldingButton />
    </div>
  );
}
