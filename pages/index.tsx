import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-green-400 font-mono">
      <h1 className="text-3xl sm:text-4xl font-bold tracking-wide text-center mb-6">
        Welcome to the History of Money
      </h1>
      <Link
        href="/module/module1"
        className="px-6 py-3 bg-gray-900 border border-green-400 rounded-lg hover:bg-gray-800 hover:text-yellow-400 transition"
      >
        Start Course
      </Link>
    </div>
  );
}
