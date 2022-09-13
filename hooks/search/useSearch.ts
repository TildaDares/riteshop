import { getData } from "@/utils/fetchData";
import { useRouter } from "next/router";
import useSWR from "swr";

const useSearch = ({ keyword, sort }: { keyword: string, sort: string }) => {
  const { isReady } = useRouter();
  const url = isReady ? getURL(keyword, sort) : null;
  const { data, error } = useSWR(url, getData)
  const loading = !data && !error;

  return {
    products: data?.products,
    error,
    loading,
  };
};

function getURL(keyword: string, sort: string) {
  let url = 'products'
  if (keyword && sort) {
    url += `?keyword=${keyword}&sort=${sort}`
  } else if (keyword) {
    url += `?keyword=${keyword}`
  } else if (sort) {
    url += `?sort=${sort}`
  } else {
    url += '?limit=12'
  }

  return url
}

export default useSearch;
