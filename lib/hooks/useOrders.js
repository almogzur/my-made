// hooks/useOrders.js
import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((res) => res.json());

const useOrders = (city) => {
  const { data, error, isLoading } = useSWR(`/api/board/${city}`, fetcher);

  return {
    orders: data,
    isLoading,
    isError: error,
  };
};

export default useOrders;
