import api from "./axios";

export const getBrands = async (): Promise<string[]> => {
  const { data } = await api.get<string[]>("/brands");

  return data;
};
