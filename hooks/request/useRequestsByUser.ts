import useSWR from "swr";

export default function useRequestsByUser(id: string) {
  const url = id ? `request-role/requests/${id}` : null
  const { data, mutate, error } = useSWR(url);
  const loading = !data && !error;

  return {
    loading,
    requests: data?.data?.requests,
    mutate,
    error
  };
}
