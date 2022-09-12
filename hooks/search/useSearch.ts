import { getData } from "@/utils/fetchData";
import { useRouter } from "next/router";
import useSWR from "swr";



const useSearch = ({ keyword, sort }: { keyword: string, sort: string }) => {
  const { isReady } = useRouter();

  const value = isReady ? `products?keyword=${keyword}&sort=${sort}` : null;

  const { data, error } = useSWR(value, getData)

  const loading = !data && !error;

  return {
    products: data?.products,
    error,
    loading,
  };
};

export default useSearch;
