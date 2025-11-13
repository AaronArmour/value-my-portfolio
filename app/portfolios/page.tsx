import Link from "next/link";
import { quattrocento } from "@/ui/fonts";

export default function Page() {
  return (
    <div className="w-[60vw] mx-auto text-left mt-[5vh]">
      <h1 className={`text-4xl font-bold mb-[5vh] ${quattrocento.className}`}>Portfolios page</h1>

      <div className="flex flex-col space-2">
        <Link href="/portfolios/1" className="text-blue-500 underline hover:text-blue-700">
          Portfolio 1
        </Link>

        <Link href="/portfolios/2" className="text-blue-500 underline hover:text-blue-700">
          Portfolio 2
        </Link>

        <Link href="/portfolios/3" className="text-blue-500 underline hover:text-blue-700">
          Portfolio 3
        </Link>
      </div>
    </div>
  );
}
