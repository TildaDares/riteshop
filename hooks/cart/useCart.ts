import useSWR from "swr";
import { getData } from '@/utils/fetchData'
import { AxiosResponse } from "axios";
import useUser from "@/hooks/user/useUser";

export default function useCart() {
  const { user } = useUser();
  const url = user ? 'cart' : null;
  const { data, mutate, error } = useSWR(url, getData);
  const loading = !data && !error && url;
  const res: AxiosResponse = error?.response
  const status = res && res.data ? res.status : ''
  const noCart = !data && status == 404

  return {
    loading,
    cart: data?.cart,
    noCart,
    mutate
  };
}
