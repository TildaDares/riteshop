import useSWR from "swr";
import useUser from "@/hooks/user/useUser";

export default function useUsers() {
  const { user } = useUser();
  const url = user ? 'users/all' : null;
  const { data, mutate, error } = useSWR(url);

  const loading = !data && !error;

  return {
    loading,
    users: data?.data?.users,
    count: data?.data?.count,
    error,
    mutate
  };
}
