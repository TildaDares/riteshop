import useSWR from "swr";

import { getData } from '@/utils/fetchData'

export default function useOrder(id: string) {
  const { data, mutate, error } = useSWR(`orders/${id}`, getData);
  const loading = !data && !error;

  return {
    loading,
    order: data?.order,
    mutate,
    error
  };
}
