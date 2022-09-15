import useSWR from "swr";
import { getData } from '@/utils/fetchData'

export default function useProductById(id: string) {
  const url = id ? `products/${id}` : null
  const { data, mutate, error } = useSWR(url, getData);
  const loading = !data && !error;

  return {
    loading,
    product: data?.product,
    mutate,
    error
  };
}