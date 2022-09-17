import useSWR from "swr";

export default function useProductById(id: string) {
  const url = id ? `products/${id}` : null
  const { data, mutate, error } = useSWR(url);
  const loading = !data && !error;

  return {
    loading,
    product: data?.data?.product,
    mutate,
    error
  };
}
