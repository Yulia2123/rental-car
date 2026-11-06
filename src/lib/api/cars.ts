import api from "./axios";
import type {
  CarsQueryParams,
  CarsResponse,
  CarsFilterOptions,
  Car,
} from "@/types/cars";

export const getCars = async (
  params: CarsQueryParams
): Promise<CarsResponse> => {
  const { data } = await api.get<CarsResponse>("/cars", {
    params,
  });

  return data;
};

export const getCarsFilterOptions = async (): Promise<CarsFilterOptions> => {
  const { data } = await api.get<CarsFilterOptions>("/cars/filters");

  return data;
};

export const getCarById = async (id: string): Promise<Car> => {
  const { data } = await api.get<Car>(`/cars/${id}`);

  return data;
};

export interface BookingRequest {
  name: string;
  email: string;
  comment: string;
}

export interface BookingResponse {
  message: string;
}

export const createBookingRequest = async (
  carId: string,
  bookingData: BookingRequest
): Promise<BookingResponse> => {
  const { data } = await api.post<BookingResponse>(
    `/cars/${carId}/booking-requests`,
    bookingData
  );

  return data;
};
