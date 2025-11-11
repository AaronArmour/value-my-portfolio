import Link from "next/link";

export default function NotFound() {
  return (
    <div className="w-[60vw] mx-auto text-left mt-[5vh]">
      <h2 className="text-2xl font-bold">404 Not Found</h2>
      <p>Could not find the requested portfolio</p>
      <Link href="/portfolios" className="text-blue-500 underline hover:text-blue-700">
        Go back to portfolios
      </Link>
    </div>
  );
}
