import useSWR from "swr";
import { getData } from '@/utils/fetchData'

export default function useUserOrders(id: string) {
  const url = id ? `orders/user/${id}` : null
  const { data, mutate, error } = useSWR(url, getData);
  const loading = !data && !error;

  return {
    loading,
    orders: data?.orders,
    mutate,
    error
  };
}
