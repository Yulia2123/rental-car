"use client";

import { useState } from "react";

import Header from "@/components/Header/Header";
import Filters from "@/components/Filters/Filters";
import CarsList from "@/components/CarsList/CarsList";

import type { CarsFilters } from "@/types/cars";

export default function CatalogPage() {
  const [filters, setFilters] = useState<CarsFilters>({});

  return (
    <>
      <Header />

      <main className="catalog">
        <div className="catalog-container">
          <Filters onSearch={setFilters} />

          <CarsList filters={filters} />
        </div>
      </main>
    </>
  );
}
