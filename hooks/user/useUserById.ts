import useSWR from "swr";
import { useRouter } from "next/router";

export default function useUserById(id: string) {
  const { isReady } = useRouter();
  const url = isReady ? `users/${id}` : null;
  const { data, mutate, error } = useSWR(url);

  const loading = !data && !error;

  return {
    loading,
    user: data?.data?.user,
    mutate,
    error
  };
}       
