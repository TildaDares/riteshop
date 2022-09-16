import { Product } from "@/types/Product";
import { getError } from "@/utils/error";
import { getData } from "@/utils/fetchData";

export const getProducts = async (url: string): Promise<Product[]> => {
  try {
    const data = await getData(url);
    return data.products;
  } catch (error) {
    throw new Error(getError(error));
  }
}

export const ProductService = {
  getProducts
};
