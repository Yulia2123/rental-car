import { useMutation } from "@tanstack/react-query";
import { createBookingRequest } from "@/lib/api/cars";

export const useCreateBookingRequest = () => {
  return useMutation({
    mutationFn: ({
      carId,
      bookingData,
    }: {
      carId: string;
      bookingData: {
        name: string;
        email: string;
        comment: string;
      };
    }) => createBookingRequest(carId, bookingData),
  });
};
