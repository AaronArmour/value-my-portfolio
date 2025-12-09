import { Holding } from "@/lib/types";
import { DeleteHolding, EditHolding } from "./buttons";
import { DeleteHoldingButton } from "./delete-holding";
import { EditHoldingButton } from "./edit-holding";

type HoldingsTableProps = {
  holdings: Holding[];
}

export default function Holdings(props: HoldingsTableProps) {
  return (
    <div>
      <h2 className="text-2xl">Holdings</h2>
        <table className="w-[100%] table-auto">
          
          <colgroup>
            <col className="w-[40%]" />
            <col className="w-[15%]" />
            <col className="w-[15%]" />
            <col className="w-[15%]" />
            <col className="w-[15%]" />
          </colgroup>
      
          <tbody>
            {props.holdings.map((holding => 
              <tr key={holding.id}>
                <td>{holding.ticker}</td>
                <td>{holding.quantity}</td>
                <td>{"$????"}</td>
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
