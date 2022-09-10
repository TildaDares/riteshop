import useSWR from "swr";
import Cookies from 'js-cookie'
import { getData } from '@/utils/fetchData'

export default function useUser() {
  const token = Cookies.get('authToken')
  const url = token ? 'users' : null;
  const { data, mutate, error } = useSWR(url, getData);

  const loading = !data && !error;
  const loggedOut: boolean = error && error.status === 403;

  return {
    loading,
    loggedOut,
    user: data?.user,
    mutate
  };
}