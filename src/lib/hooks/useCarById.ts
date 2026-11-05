import { useQuery } from "@tanstack/react-query";
import { getCarById } from "@/lib/api/cars";

export const useCarById = (id: string) => {
  return useQuery({
    queryKey: ["car", id],
    queryFn: () => getCarById(id),
    enabled: Boolean(id),
  });
};
