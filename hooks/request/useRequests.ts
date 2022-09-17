import useSWR from "swr";

export default function useRequests() {
  const url = 'request-role'
  const { data, mutate, error } = useSWR(url);
  const loading = !data && !error;

  return {
    loading,
    requests: data?.data?.requests,
    count: data?.data?.count,
    mutate,
    error
  };
}
