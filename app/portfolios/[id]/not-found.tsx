import { quattrocento } from "@/ui/fonts";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="w-[60vw] mx-auto text-left mt-[5vh]">
      <h2 className={`mb-[5vh] text-2xl font-bold ${quattrocento.className}`}>404 Not Found</h2>
      <div className="flex items-center space-x-4 mb-[5vh]">
        <ExclamationCircleIcon className="w-20" />
        <p>Could not find the requested portfolio</p>
      </div>

      <Link href="/portfolios" className="text-blue-500 underline hover:text-blue-700">
        Go back to portfolios
      </Link>
    </div>
  );
}
