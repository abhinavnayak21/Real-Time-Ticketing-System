import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
        <h1 className="text-3xl font-bold text-center">
          Real-Time Ticketing System
        </h1>

        <p className="mt-2 text-center text-gray-500">
          Choose your dashboard
        </p>

        <div className="mt-8 space-y-4">
          <Link
            href="/customer"
            className="block rounded-lg bg-blue-600 py-3 text-center font-semibold text-white hover:bg-blue-700"
          >
            Customer Dashboard
          </Link>

          <Link
            href="/agent"
            className="block rounded-lg bg-green-600 py-3 text-center font-semibold text-white hover:bg-green-700"
          >
            Agent Dashboard
          </Link>

          <Link
            href="/admin"
            className="block rounded-lg bg-purple-600 py-3 text-center font-semibold text-white hover:bg-purple-700"
          >
            Admin Dashboard
          </Link>
        </div>
      </div>
    </main>
  );
}