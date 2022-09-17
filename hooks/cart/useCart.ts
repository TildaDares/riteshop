import useSWR from "swr";
import useUser from "@/hooks/user/useUser";

export default function useCart() {
  const { user } = useUser();
  const url = user ? 'cart' : null;
  const { data, mutate, error } = useSWR(url);
  const loading = !data && !error && url;

  return {
    loading,
    cart: data?.data?.cart,
    mutate,
    error
  };
}
