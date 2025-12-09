'use client';

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Holding } from "@/lib/types"
import { TrashIcon } from "@heroicons/react/24/outline"

type DeleteHoldingButtonProps = {
  holding: Holding
}

export function DeleteHoldingButton({ holding }: DeleteHoldingButtonProps) {
  const handleDelete = () => {
    console.log(`Holding ${holding.ticker} (with id=${holding.id}) deleted!`)
    // Later you can replace this with an API call or state update
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="bg-background text-foreground flex h-10 w-12 items-center justify-center rounded-lg hover:bg-gray-800">
          <span className="sr-only">Delete</span>
          <TrashIcon className="w-5" />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm delete holding</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently remove {" "}
            <strong>{holding.ticker}</strong> from this portfolio.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>
            Yes, delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}