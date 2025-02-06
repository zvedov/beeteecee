import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsDesktop(window.innerWidth >= 640);
      window.addEventListener("resize", () => setIsDesktop(window.innerWidth >= 640));
    }
  }, []);

  return (
    <>
      {/* Floating Menu Button (Mobile) */}
      {!isDesktop && (
        <button
          className="fixed top-4 left-4 sm:hidden bg-yellow-400 text-black px-4 py-2 rounded-lg shadow-md"
          onClick={() => setMenuOpen(true)}
        >
          ☰ Menu
        </button>
      )}

      {/* Sidebar Menu with Smooth Animation */}
      <AnimatePresence>
        {(menuOpen || isDesktop) && (
          <motion.nav
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed top-0 left-0 h-screen w-64 bg-black text-green-400 p-6 shadow-lg sm:translate-x-0"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Course Navigation</h2>
              {/* Close Button (Only on Mobile) */}
              {!isDesktop && (
                <button
                  className="text-yellow-400 border border-yellow-400 px-3 py-1 rounded"
                  onClick={() => setMenuOpen(false)}
                >
                  ✕ Close
                </button>
              )}
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
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
