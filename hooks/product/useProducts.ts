import useSWR from "swr";
import { getData } from '@/utils/fetchData'

export default function useProducts() {
  const { data, error } = useSWR('products', getData);

  const loading = !data && !error;

  return {
    loading,
    products: data?.products,
    error,
    count: data?.count
  };
}