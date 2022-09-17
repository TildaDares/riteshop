import useSWR from "swr";
import Cookies from 'js-cookie'

export default function useUser() {
  const token = Cookies.get('authToken')
  const url = token ? 'users' : null;
  const { data, mutate, error } = useSWR(url);

  const loading = !data && !error;
  const loggedOut: boolean = error && error.status === 403;

  if (!token) {
    return {
      loading: false,
      loggedOut: true,
      error: null,
      user: null,
    };
  }

  return {
    loading,
    loggedOut,
    user: data?.data?.user,
    mutate
  };
}