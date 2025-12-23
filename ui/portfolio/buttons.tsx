'use client';

import { ArrowPathIcon, ArrowUturnLeftIcon, PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export function BackToPortfolios() {
  return (
    <Link 
      href="/portfolios"
      className="mx-auto flex h-10 w-40 items-center justify-center rounded-lg text-white bg-blue-600 hover:bg-blue-800"
    >
      <ArrowUturnLeftIcon className="h-5 mr-2" />
      Portfolios
    </Link>
  );
}

export function RefreshValuation({ onRefreshAction }: { onRefreshAction: () => Promise<void>}) {
  const handleRefresh = async () => {
    try {
      await onRefreshAction();
    } catch (err) {
      console.error("Error refreshing valuation:", err);
    }
  };


  return (
    <button 
      type="button"
      onClick={handleRefresh}
      className="flex h-10 w-12 items-center justify-center rounded-lg text-white hover:bg-gray-800"
    >
      <span className="sr-only">Refresh</span>
      <ArrowPathIcon className="w-5" />
    </button>
  );
}

export function EditHolding({ id }: { id: string }) {
  const editHolding = () => {
    console.log(`You clicked on edit holding for holding ${id}`);
  }

  return (
    <button 
      type="button"
      onClick={editHolding}
      className="flex h-10 w-12 items-center justify-center rounded-lg text-white hover:bg-gray-800"
    >
      <span className="sr-only">Edit</span>
      <PencilIcon className="w-5" />
    </button>
  );
}

export function DeleteHolding({ id }: { id: string }) {
  const deleteHolding = () => {
    console.log(`You clicked on delete holding for holding ${id}`);
  };

  return (
    <form action={deleteHolding}>
      <button type="submit" className="flex h-10 w-12 items-center justify-center rounded-lg text-white hover:bg-gray-800">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
  );
}

export function AddHolding() {
  const id = 3; // TODO: add logic to create a new portfolio object and set the id here

  return (
    <Link
      href={`/portfolios/${id}`}
      className="mx-auto flex h-10 w-40 items-center justify-center rounded-lg text-white bg-blue-600 hover:bg-blue-800"
    >
      <PlusIcon className="h-5 mr-2" />
      {' '}<span className="hidden md:block">Holding</span>
    </Link>
  );
}
