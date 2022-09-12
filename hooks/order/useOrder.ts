import useSWR from "swr";
import { getData } from '@/utils/fetchData'

export default function useOrder(id: string) {
  const url = id ? `orders/${id}` : null
  const { data, mutate, error } = useSWR(url, getData);
  const loading = !data && !error;

  return {
    loading,
    order: data?.order,
    mutate,
    error
  };
}
