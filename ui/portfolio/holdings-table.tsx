import { Holding, PriceMap } from "@/lib/types";
import { DeleteHoldingButton } from "./delete-holding";
import { EditHoldingButton } from "./edit-holding";

type HoldingsTableProps = {
  holdings: Holding[];
  priceMap: PriceMap;
}

export default function Holdings(props: HoldingsTableProps) {
  const { holdings, priceMap } = props;
  return (
    <div>
      <h2 className="text-2xl">Holdings</h2>
        <table className="w-[100%] table-auto">
          
          <colgroup>
            <col className="w-[30%]" />
            <col className="w-[20%]" />
            <col className="w-[10%]" />
            <col className="w-[20%]" />
            <col className="w-[10%]" />
            <col className="w-[10%]" />
          </colgroup>
      
          <tbody>
            {holdings.map((holding => 
              <tr key={holding.id}>
                <td>{holding.ticker}</td>
                <td>${
                    priceMap.has(holding.ticker) ? priceMap.get(holding.ticker)?.toFixed(2) : undefined
                  }</td>
                <td>{holding.quantity}</td>
                <td>${
                    priceMap.has(holding.ticker) ? (holding.quantity * priceMap.get(holding.ticker)!)?.toFixed(2) : undefined
                  }</td>
                <td>
                  <EditHoldingButton holding={holding} />
                </td>
                <td>
                  <DeleteHoldingButton holding={holding} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
    </div>
  );
}
