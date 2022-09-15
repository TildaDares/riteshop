import useSWR from "swr";
import { getData } from '@/utils/fetchData'

export default function useOrders() {
  const url = 'orders/all'
  const { data, mutate, error } = useSWR(url, getData);
  const loading = !data && !error;

  return {
    loading,
    orders: data?.orders,
    count: data?.count,
    mutate,
    error
  };
}
