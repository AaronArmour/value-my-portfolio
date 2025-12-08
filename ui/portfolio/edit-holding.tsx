"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Holding } from "@/lib/types";
import { PencilIcon } from "@heroicons/react/24/outline";

type EditHoldingButtonProps = {
  holding: Holding
}

export function EditHoldingButton({ holding }: EditHoldingButtonProps) {
  const [shares, setShares] = useState(holding.quantity);
  const [open, setOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Add your update logic here (API call, state update, etc.)
    console.log(`Updated shares for ${holding.ticker} (id=${holding.id}): ${shares}`);
    setOpen(false); // close dialog after saving
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen);
        if (isOpen) {
          // Reset form state when dialog opens
          setShares(holding.quantity);
        }
      }}

    >
      <DialogTrigger asChild>
        <Button className="bg-background text-foreground flex h-10 w-12 items-center justify-center rounded-lg hover:bg-gray-800">
          <span className="sr-only">Edit</span>
          <PencilIcon className="w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit holding</DialogTitle>
          <DialogDescription>
            Update the number of shares for <strong>{holding.ticker}</strong>.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="shares">Number of Shares</Label>
            <Input
              id="shares"
              type="number"
              min={0}
              value={shares}
              onChange={(e) => setShares(Number(e.target.value))}
            />
          </div>

          <DialogFooter className="flex justify-end gap-2">
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}