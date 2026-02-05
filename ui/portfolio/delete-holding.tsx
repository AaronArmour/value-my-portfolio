'use client';

import { useRouter } from "next/navigation";
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
import { removeHolding } from "@/lib/actions";
import { Holding } from "@/lib/types"
import { TrashIcon } from "@heroicons/react/24/outline"

type DeleteHoldingButtonProps = {
  holding: Holding
}

export function DeleteHoldingButton({ holding }: DeleteHoldingButtonProps) {
  const router = useRouter();
  
  const handleDelete = async () => {
    try {
      await removeHolding(holding.id);
    } catch (error) {
      console.error(error);
    }
    console.log(`Holding ${holding.ticker} (with id=${holding.id}) deleted!`)
    router.refresh();
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