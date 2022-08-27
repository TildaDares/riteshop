import useSWR from "swr";

import { getData } from '../../utils/fetchData'

export default function useUser() {
  const { data, mutate, error } = useSWR('users', getData);

  const loading = !data && !error;
  const loggedOut: boolean = error && error.status === 403;

  return {
    loading,
    loggedOut,
    user: data?.user,
    mutate
  };
}