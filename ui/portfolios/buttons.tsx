import { deletePortfolio } from "@/lib/actions";
import { EyeIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export function ViewPortfolio({ id }: { id: string }) {
    return (
    <Link
      href={`/portfolios/${id}`}
      className="flex h-10 w-12 items-center justify-center rounded-lg text-white hover:bg-gray-800"
    >
      <EyeIcon className="h-5" />
    </Link>
  );
}

export function DeletePortfolio({ id }: { id: string }) {
    const deletePortfolioWithId = deletePortfolio.bind(null, id)

  return (
    <form action={deletePortfolioWithId}>
      <button type="submit" className="flex h-10 w-12 items-center justify-center rounded-lg text-white hover:bg-gray-800">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
  );
}

export function CreatePortfolio() {
  const id = 3; // TODO: add logic to create a new portfolio object and set the id here

  return (
    <Link
      href={`/portfolios/${id}`}
      className="flex h-10 w-40 items-center justify-center rounded-lg text-white bg-blue-600 hover:bg-blue-800"
    >
      <PlusIcon className="h-5 mr-2" />
      {' '}<span className="hidden md:block">Portfolio</span>
    </Link>
  );
}