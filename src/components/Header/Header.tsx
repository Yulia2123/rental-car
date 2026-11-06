"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  const isHomeActive = pathname === "/";
  const isCatalogActive = pathname === "/catalog";

  return (
    <header className="header">
      <div className="container header-container">
        <Link href="/" className="header-logo">
          Rental<span>Car</span>
        </Link>

        <nav className="header-nav">
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
