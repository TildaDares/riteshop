import useSWR from "swr";

export default function useProducts() {
  const { data, error } = useSWR('products');

  const loading = !data && !error;

  return {
    loading,
    products: data?.data?.products,
    error,
    count: data?.data?.count
  };
}