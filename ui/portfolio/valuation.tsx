'use client';

import { Holding, Portfolio, PriceMap } from "@/lib/types";
import { RefreshValuation } from "./buttons";
import React from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { getPortfolioValue } from "@/lib/portfolio";

type ValuationProps = {
  portfolio: Portfolio;
  holdings: Holding[];
  priceMap: PriceMap;
  setPriceMapAction: React.Dispatch<React.SetStateAction<PriceMap>>;
}

export default function Valuation(props: ValuationProps) {
  const { holdings, priceMap } = props;
  const [useCurrent, setUseCurrent] = React.useState(true)
  const [date, setDate] = React.useState<Date | undefined>(new Date())

  const value = getPortfolioValue(holdings, priceMap);

  return (
    <div>
      <h2 className="text-2xl">Value</h2>
      <div className="flex items-center space-x-4">
        <p className="text-xl">{`$${value.toFixed(2)}`}</p>
        <RefreshValuation id={props.portfolio.id}/>
      </div>

      <div className="flex items-center gap-4">
        {/* Left label */}
        <Label className={cn(useCurrent ? "text-foreground" : "text-muted-foreground")}>
          Current
        </Label>

        {/* Switch */}
        <Switch
          checked={!useCurrent}
          onCheckedChange={(checked) => setUseCurrent(!checked)}
        />

        {/* Date Picker */}
        <Popover>
          <PopoverTrigger asChild>
            <button
              className={cn(
                "border rounded px-3 py-2 text-sm",
                useCurrent ? "text-muted-foreground cursor-not-allowed" : "text-foreground"
              )}
              disabled={useCurrent}
            >
              {date ? date.toDateString() : "Pick a date"}
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              autoFocus
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
