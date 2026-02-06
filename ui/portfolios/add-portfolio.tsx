'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
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
import { PlusIcon } from "@heroicons/react/24/outline";
import { addPortfolio } from "@/lib/actions";

export function AddPortfolioButton() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const id = await addPortfolio(name);
      router.push(`/portfolios/${id}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen);
        if (isOpen) {
          // Reset form state when dialog opens
          setName("");
        }
      }}

    >
      <DialogTrigger asChild>
        <Button className="mx-auto flex h-10 w-40 items-center justify-center rounded-lg text-base text-foreground bg-blue-600 hover:bg-blue-800">
          <PlusIcon className="h-5 mr-2" />
          {' '}<span className="hidden md:block">Portfolio</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Portfolio</DialogTitle>
          <DialogDescription>
            Enter the portfolio name.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <DialogFooter className="flex justify-end gap-2">
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              disabled={name === ""}
            >
              Add Portfolio
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
