import Link from "next/link";

export default function Header() {
  return (
    <header className="header">
      <div className="container header-container">
        <Link href="/" className="header-logo">
          Rental<span>Car</span>
        </Link>

        <nav className="header-nav">
          <Link href="/" className="header-link header-link-active">
            Home
          </Link>

          <Link href="/catalog" className="header-link">
            Catalog
          </Link>
        </nav>
      </div>
    </header>
  );
}
