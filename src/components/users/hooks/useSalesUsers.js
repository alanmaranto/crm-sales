import { useQuery } from "react-query";
import { getSalesUsers } from "../../../providers/sales-providers";
import { queryKeys } from "../../../react-query/constants";

export const useSalesUsers = () => {
  const fallback = [];
  const {
    data = fallback,
    refetch,
    isFetching,
    isLoading,
  } = useQuery(queryKeys.sales, getSalesUsers, {
    keepPreviousData: true,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  return {
    salesUsers: data,
    refetch,
    isFetching,
    isLoading,
  };
};
