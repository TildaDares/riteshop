import useSWR from "swr";

import { getData } from '@/utils/fetchData'

export default function useProducts() {
  const { data, error } = useSWR('products', getData);

  const loading = !data && !error;
  const loggedOut: boolean = error && error.status === 403;

  return {
    loading,
    loggedOut,
    products: data?.products,
  };
}