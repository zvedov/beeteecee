import Navigation from "@/components/Navigation";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <div className="flex bg-black text-green-400 font-mono min-h-screen">
      <Navigation />
      <main className="ml-0 sm:ml-64 w-full p-6">
        <Component {...pageProps} />
      </main>
    </div>
  );
}
