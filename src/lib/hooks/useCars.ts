import { useInfiniteQuery } from "@tanstack/react-query";
import { getCars } from "@/lib/api/cars";
import type { CarsFilters } from "@/types/cars";

const PER_PAGE = 12;

export const useCars = (filters: CarsFilters) => {
  const { price, ...apiFilters } = filters;

  return useInfiniteQuery({
    queryKey: ["cars", filters],
    queryFn: ({ pageParam }) =>
      getCars({
        ...apiFilters,
        page: pageParam,
        perPage: PER_PAGE,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.totalPages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
  });
};
