import useSWR from "swr";

export default function useOrders() {
  const url = 'orders/all'
  const { data, mutate, error } = useSWR(url);
  const loading = !data && !error;

  return {
    loading,
    orders: data?.data?.orders,
    count: data?.data?.count,
    mutate,
    error
  };
}
