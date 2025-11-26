import { quattrocento } from "@/ui/fonts";
import { CreatePortfolio } from "@/ui/portfolios/buttons";
import { PortfolioTable } from "@/ui/portfolios/portfolio-table";
import { portfolios } from "@/lib/placeholder-data";

export default function Page() {
  return (
    <div className="w-[60vw] mx-auto text-left mt-[5vh]">
      <h1 className={`text-4xl font-bold mb-[5vh] ${quattrocento.className}`}>Portfolios page</h1>

      <div className="mb-[5vh]">
        <PortfolioTable portfolios={portfolios}/>
      </div>
      
      <CreatePortfolio />
    </div>
  );
}
