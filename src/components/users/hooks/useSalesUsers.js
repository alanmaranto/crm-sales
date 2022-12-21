import { useMutation, useQuery } from "react-query";
import { salesDB } from "../../../api/axios";
import { queryKeys } from "../../../react-query/constants";

export const getSalesUsers = () => {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        const response = await salesDB.get("/users");
        console.log("response", response);
        if (response.status === 200) {
          resolve(response.data);
        }
      } catch (error) {
        reject(new Error(error.message));
      }
    }, 1000);
  });
};

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

export const updateSalesUserStatus = async ({ id, data, status }) => {
  try {
    const response = await salesDB.put(`/users/${id}`, {
      ...data,
      status,
    });
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    throw new Error(error.message);
  }
};
