import { useQuery } from "@tanstack/react-query";
import { getBrands } from "@/lib/api/brands";

export const useBrands = () => {
  return useQuery({
    queryKey: ["brands"],
    queryFn: getBrands,
  });
};
