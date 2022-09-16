import useSWRInfinite from "swr/infinite";
import { ProductService } from "@/services/ProductService";
import { Product } from "@/types/Product";

const PAGE_SIZE = 12;

export default function useProducts() {
  const { data, error, mutate, size, setSize, isValidating } = useSWRInfinite(
    (index) => `products?page=${index + 1}&limit=${PAGE_SIZE}`, (url: string) => ProductService.getProducts(url));

  const products: Product[] = data ? ([] as any[]).concat(...data) : [];
  const isLoadingInitialData = !data && !error;
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === "undefined");
  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.length < PAGE_SIZE);
  const isRefreshing = isValidating && data && data.length === size;

  const loadMore = () => {
    setSize(size + 1);
  };

  return {
    isLoadingInitialData,
    isLoadingMore,
    isEmpty,
    isReachingEnd,
    isRefreshing,
    loadMore,
    products
  };
}
