import useSWR from "swr";
import { getData } from '@/utils/fetchData'
import { useRouter } from "next/router";

export default function useUserById(id: string) {
  const { isReady } = useRouter();
  const url = isReady ? `/users/${id}` : null;
  const { data, mutate, error } = useSWR(url, getData);

  const loading = !data && !error;

  return {
    loading,
    user: data?.user,
    mutate
  };
}       
