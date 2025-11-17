import Link from "next/link";
import { quattrocento } from "@/ui/fonts";
import { CreatePortfolio, DeletePortfolio, ViewPortfolio } from "@/ui/portfolios/buttons";
import { PortfolioTable } from "@/ui/portfolios/portfolio-table";

export default function Page() {
  return (
    <div className="w-[60vw] mx-auto text-left mt-[5vh]">
      <h1 className={`text-4xl font-bold mb-[5vh] ${quattrocento.className}`}>Portfolios page</h1>

      <div className="mb-[5vh]">
        <PortfolioTable />
      </div>
      
      <CreatePortfolio />
    </div>
  );
}
