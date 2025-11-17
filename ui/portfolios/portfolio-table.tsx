import Link from "next/link";
import { DeletePortfolio, ViewPortfolio } from "./buttons";

const portfolios = [
  {id: "1", name: "Portfolio 1", value: 1000},
  {id: "2", name: "Portfolio 2", value: 2000},
  {id: "3", name: "Portfolio 3", value: 3000}
];

export function PortfolioTable() {
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
