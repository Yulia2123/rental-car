import { useQuery } from "@tanstack/react-query";
import { getCarsFilterOptions } from "@/lib/api/cars";

export const useCarFilters = () => {
  return useQuery({
    queryKey: ["car-filters"],
    queryFn: getCarsFilterOptions,
  });
};
