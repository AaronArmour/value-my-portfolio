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
import { removePortfolio } from "@/lib/actions";
import { Portfolio } from "@/lib/types"
import { TrashIcon } from "@heroicons/react/24/outline"
import { useRouter } from "next/navigation";

type DeletePortfolioButtonProps = {
  portfolio: Portfolio
}

export function DeletePortfolioButton({ portfolio }: DeletePortfolioButtonProps) {
  const router = useRouter();
  
  const handleDelete = async () => {
    try {
      await removePortfolio(portfolio.id);
    } catch (error) {
      console.error(error);
    }

    console.log(`Portfolio ${portfolio.name} (with id=${portfolio.id}) deleted!`)
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
          <AlertDialogTitle>Confirm delete portfolio</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete {" "}
            <strong>{portfolio.name}</strong> and all holdings in this portfolio.
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