"use client";

import { useCars } from "@/lib/hooks/useCars";
import CarCards from "@/components/CarCards/CarCards";
import LoadMore from "@/components/LoadMore/LoadMore";
import type { CarsFilters } from "@/types/cars";
import Loader from "@/components/Loader/Loader";

interface CarsListProps {
  filters: CarsFilters;
}

export default function CarsList({ filters }: CarsListProps) {
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useCars(filters);

  const cars = data?.pages.flatMap((page) => page.cars) ?? [];

  if (isLoading) {
    return <Loader size="large" />;
  }

  if (isError) {
    return <p>Failed to load cars. Please try again.</p>;
  }

  if (cars.length === 0) {
    return <p>No cars found.</p>;
  }

  return (
    <>
      <div className="cars-list">
        {cars.map((car) => (
          <CarCards key={car.id} car={car} />
        ))}
      </div>

      {hasNextPage && (
        <LoadMore
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
        />
      )}
      {isFetchingNextPage && <Loader size="medium" />}
    </>
  );
}
