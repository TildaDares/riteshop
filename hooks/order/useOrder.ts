import useSWR from "swr";

export default function useOrder(id: string) {
  const url = id ? `orders/${id}` : null
  const { data, mutate, error } = useSWR(url);
  const loading = !data && !error;

  return {
    loading,
    order: data?.data?.order,
    mutate,
    error
  };
}
