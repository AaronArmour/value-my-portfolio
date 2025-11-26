import { DeletePortfolio, ViewPortfolio } from "./buttons";
import { Portfolio } from "@/lib/types";

type PortfolioTableProps = {
  portfolios: Portfolio[];
};


export function PortfolioTable({ portfolios } : PortfolioTableProps) {
  return (
  <table className="w-[70%] mx-auto table-auto">
    
    <colgroup>
      <col className="w-[60%]" />
      <col className="w-[20%]" />
      <col className="w-[10%]" />
      <col className="w-[10%]" />
    </colgroup>

    <tbody>
      {portfolios.map((portfolio => 
        <tr key={portfolio.id}>
          <td>{portfolio.name}</td>
          <td>{"$" + portfolio.value}</td>
          <td>
            <ViewPortfolio id={portfolio.id} />
          </td>
          <td>
            <DeletePortfolio id={portfolio.id} />
          </td>
        </tr>
      ))}
    </tbody>
  </table>
  );
}
