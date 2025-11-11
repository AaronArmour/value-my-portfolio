import Link from "next/link";
import { notFound } from "next/navigation";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;

  if (id !== '1' && id !== '2' && id !== '3') {
    notFound();
  }

  return (
    <div className="w-[60vw] mx-auto text-left mt-[5vh]">
      <h1 className="text-4xl font-bold">Portfolio {id} page</h1>

      <Link href="/portfolios" className="text-blue-500 underline hover:text-blue-700">
        Return to Portfolios
      </Link>
    </div>
  );
}
