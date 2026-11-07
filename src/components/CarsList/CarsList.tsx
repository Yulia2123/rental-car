"use client";

import { useCars } from "@/lib/hooks/useCars";
import CarCards from "@/components/CarCards/CarCards";
import LoadMore from "@/components/LoadMore/LoadMore";
import Loader from "@/components/Loader/Loader";
import CatalogLoader from "@/components/CatalogLoader/CatalogLoader";
import NotFound from "@/components/NotFound/NotFound";

import type { CarsFilters } from "@/types/cars";

interface CarsListProps {
  filters: CarsFilters;
  onReset: () => void;
}

export default function CarsList({ filters, onReset }: CarsListProps) {
  const {
    data,
    isFetching,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useCars(filters);

  const isCatalogLoading = isFetching && !isFetchingNextPage;

  const cars = data?.pages.flatMap((page) => page.cars) ?? [];

  return (
    <div className="cars-content">
      {isCatalogLoading && <CatalogLoader />}

      {isError && <p>Failed to load cars. Please try again.</p>}

      {!isCatalogLoading && !isError && cars.length === 0 && (
        <NotFound onReset={onReset} />
      )}

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
    </div>
  );
}
