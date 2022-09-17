import useSWR from "swr";

export default function useUserOrders(id: string) {
  const url = id ? `orders/user/${id}` : null
  const { data, mutate, error } = useSWR(url);
  const loading = !data && !error;

  return {
    loading,
    orders: data?.data?.orders,
    mutate,
    error
  };
}
