import useSWR from "swr";
import { getData } from '@/utils/fetchData'
import { AxiosResponse } from "axios";

export default function useCart() {
  const { data, mutate, error } = useSWR('cart', getData);
  const loading = !data && !error;
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
