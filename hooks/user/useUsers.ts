import useSWR from "swr";
import { getData } from '@/utils/fetchData'
import useUser from "@/hooks/user/useUser";

export default function useUsers() {
  const { user } = useUser();
  const url = user ? 'users/all' : null;
  const { data, mutate, error } = useSWR(url, getData);

  const loading = !data && !error;

  return {
    loading,
    users: data?.users,
    count: data?.count,
    error,
    mutate
  };
}
