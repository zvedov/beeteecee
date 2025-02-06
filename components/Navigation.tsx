import { useState } from "react";
import Link from "next/link";

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Floating Menu Button (Mobile) */}
      <button
        className="fixed top-4 left-4 sm:hidden bg-yellow-400 text-black px-4 py-2 rounded-lg shadow-md"
        onClick={() => setMenuOpen(true)}
      >
        ☰ Menu
      </button>

      {/* Sidebar Menu (Full-Screen on Mobile) */}
      <nav
        className={`fixed top-0 left-0 h-screen w-full sm:w-64 bg-black text-green-400 p-6 transition-transform ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0`}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Course Navigation</h2>
          {/* Close Button (Visible on Mobile) */}
          <button
            className="sm:hidden text-yellow-400 border border-yellow-400 px-3 py-1 rounded"
            onClick={() => setMenuOpen(false)}
          >
            ✕ Close
          </button>
        </div>

        <ul className="space-y-3">
          <li>
            <Link href="/" className="hover:text-yellow-400">🏠 Home</Link>
          </li>
          <li>
            <Link href="/module/module1" className="hover:text-yellow-400">📚 History of Money</Link>
          </li>
          <li>
            <Link href="/terms/module1" className="hover:text-yellow-400">📖 Terms & Glossary</Link>
          </li>
        </ul>
      </nav>
    </>
  );
}
