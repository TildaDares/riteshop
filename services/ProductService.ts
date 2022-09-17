import { Product } from "@/types/Product";
import { getError } from "@/utils/error";
import axiosInstance from '@/utils/axiosConfig'

export const getProducts = async (url: string): Promise<Product[]> => {
  try {
    const data = await axiosInstance.get(url);
    return data?.data?.products;
  } catch (error) {
    throw new Error(getError(error));
  }
}

export const ProductService = {
  getProducts
};
