"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@/components/ThemeProvider/ThemeProvider";
import { FiMoon, FiSun } from "react-icons/fi";

export default function Header() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  const isHomeActive = pathname === "/";
  const isCatalogActive = pathname === "/catalog";

  return (
    <header className="header">
      <div className="container header-container">
        <Link href="/" className="header-logo">
          Rental<span>Car</span>
        </Link>

        <nav className="header-nav">
          <button
            type="button"
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={`Switch to ${
              theme === "light" ? "dark" : "light"
            } theme`}
            title="Change theme"
          >
            {theme === "light" ? <FiMoon /> : <FiSun />}
          </button>
          <Link
            href="/"
            className={`header-link ${
              isHomeActive ? "header-link-active" : ""
            }`}
          >
            Home
          </Link>

          <Link
            href="/catalog"
            className={`header-link ${
              isCatalogActive ? "header-link-active" : ""
            }`}
          >
            Catalog
          </Link>
        </nav>
      </div>
    </header>
  );
}
