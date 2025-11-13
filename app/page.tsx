import { quattrocento } from "@/ui/fonts";
import Link from "next/link";

export default function Page() {
  return (
    <div className="w-[60vw] mx-auto text-left mt-[5vh]">
      <h1 className={`text-4xl font-bold mb-[5vh] ${quattrocento.className}`}>Home page</h1>
      <p>Welcome to Value My Portfolio!</p>
      <Link href="/portfolios" className="text-blue-500 underline hover:text-blue-700">
        Go to Portfolios
      </Link>
    </div>
  );
}
