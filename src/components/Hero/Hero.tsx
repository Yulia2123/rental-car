import Link from "next/link";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1 className="hero-title">Find your perfect rental car</h1>

        <p className="hero-description">
          Reliable and budget-friendly rentals for any journey
        </p>

        <Link href="/catalog" className="hero-button">
          View Catalog
        </Link>
      </div>
    </section>
  );
}
