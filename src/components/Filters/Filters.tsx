"use client";

import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import type { CarsFilters } from "@/types/cars";
import toast from "react-hot-toast";
import styles from "./Filters.module.css";

interface FiltersProps {
  onSearch: (filters: CarsFilters) => void;
}

interface DropdownProps {
  id: string;
  label: string;
  placeholder: string;
  options: (string | number)[];
  value: string;
  onChange: (value: string) => void;
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

function Dropdown({
  id,
  label,
  placeholder,
  options,
  value,
  onChange,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.filterField}>
      <label className={styles.label} id={`${id}-label`}>
        {label}
      </label>

      <div className={styles.selectWrapper} ref={dropdownRef}>
        <button
          type="button"
          className={`${styles.select} ${isOpen ? styles.selectOpen : ""}`}
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-labelledby={`${id}-label`}
        >
          <span className={value ? "" : styles.placeholder}>
            {value || placeholder}
          </span>

          <svg
            className={styles.selectIcon}
            width="16"
            height="16"
            aria-hidden="true"
          >
            <use href={`/icons/icons.svg#${isOpen ? "up" : "down"}`} />
          </svg>
        </button>

        {isOpen && (
          <ul className={styles.dropdownList} role="listbox">
            {options.map((option) => (
              <li key={option}>
                <button
                  type="button"
                  className={`${styles.dropdownOption} ${
                    value === String(option) ? styles.selectedOption : ""
                  }`}
                  onClick={() => {
                    onChange(String(option));
                    setIsOpen(false);
                  }}
                  role="option"
                  aria-selected={value === String(option)}
                >
                  {option}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

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
      toast.error("The minimum mileage cannot exceed the maximum mileage.");
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
    <form className={styles.filters} onSubmit={handleSearch}>
      <Dropdown
        id="brand"
        label="Car brand"
        placeholder="Choose a brand"
        options={brands}
        value={brand}
        onChange={setBrand}
      />

      <Dropdown
        id="price"
        label="Price / 1 hour"
        placeholder="Choose a price"
        options={prices}
        value={price}
        onChange={setPrice}
      />

      <div className={`${styles.filterField} ${styles.mileageField}`}>
        <label className={styles.label} htmlFor="minMileage">
          Car mileage / km
        </label>

        <div className={styles.mileageInputs}>
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

      <div className={styles.filterActions}>
        <button type="submit" className={styles.searchButton}>
          Search
        </button>

        <button
          type="button"
          className={styles.clearFilters}
          onClick={handleClear}
        >
          Clear filters
        </button>
      </div>
    </form>
  );
}
