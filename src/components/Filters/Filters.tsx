"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import type { CarsFilters } from "@/types/cars";
import toast from "react-hot-toast";

interface FiltersProps {
  onSearch: (filters: CarsFilters) => void;
}

const brands = [
  "Aston Martin",
  "Audi",
  "BMW",
  "Bentley",
  "Buick",
  "Chevrolet",
  "Chrysler",
  "GMC",
  "HUMMER",
];

const prices = [30, 40, 50, 60, 70, 80];

export default function Filters({ onSearch }: FiltersProps) {
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [minMileage, setMinMileage] = useState("");
  const [maxMileage, setMaxMileage] = useState("");

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      minMileage !== "" &&
      maxMileage !== "" &&
      Number(minMileage) > Number(maxMileage)
    ) {
      toast.error(
        "Мінімальний пробіг не може перевищувати максимальний пробіг."
      );
      return;
    }

    const filters: CarsFilters = {
      ...(brand && { brand }),
      ...(price && { price: Number(price) }),
      ...(minMileage !== "" && { minMileage: Number(minMileage) }),
      ...(maxMileage !== "" && { maxMileage: Number(maxMileage) }),
    };

    onSearch(filters);
  };

  const handleClear = () => {
    setBrand("");
    setPrice("");
    setMinMileage("");
    setMaxMileage("");

    onSearch({});
  };

  return (
    <form className="filters" onSubmit={handleSearch}>
      <div className="filter-field">
        <label htmlFor="brand">Car brand</label>

        <select
          id="brand"
          value={brand}
          onChange={(event) => setBrand(event.target.value)}
        >
          <option value="">Choose a brand</option>

          {brands.map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-field">
        <label htmlFor="price">Price / 1 hour</label>

        <select
          id="price"
          value={price}
          onChange={(event) => setPrice(event.target.value)}
        >
          <option value="">Choose a price</option>

          {prices.map((price) => (
            <option key={price} value={price}>
              {price}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-field mileage-field">
        <label htmlFor="minMileage">Car mileage / km</label>

        <div className="mileage-inputs">
          <input
            id="minMileage"
            type="number"
            min="0"
            placeholder="From"
            value={minMileage}
            onChange={(event) => setMinMileage(event.target.value)}
          />

          <input
            id="maxMileage"
            type="number"
            min="0"
            placeholder="To"
            value={maxMileage}
            onChange={(event) => setMaxMileage(event.target.value)}
          />
        </div>
      </div>

      <div className="filter-actions">
        <button type="submit" className="search-button">
          Search
        </button>

        <button type="button" className="clear-filters" onClick={handleClear}>
          Clear filters
        </button>
      </div>
    </form>
  );
}
