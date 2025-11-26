import { Portfolio } from "@/lib/types";
import { RefreshValuation } from "./buttons";

type ValuationProps = {
  portfolio: Portfolio;
}

export default function Valuation(props: ValuationProps) {
  return (
    <div>
      <h2 className="text-2xl">Value</h2>
      <div className="flex items-center space-x-4">
        <p className="text-xl">{`$${props.portfolio.value}`}</p>
        <RefreshValuation id={props.portfolio.id}/>
      </div>
    </div>
  );
}
