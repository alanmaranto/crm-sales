import { useMutation, useQuery } from "react-query";
import { salesDB } from "../../../api/axios";
import { queryKeys } from "../../../react-query/constants";

export const getSalesUsers = async () => {
  // return new Promise((resolve, reject) => {
  //   setTimeout(() => {
  try {
    const response = await salesDB.get("/users");
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    throw new Error(error.message);
  }
  //   }, 1000);
  // });
};

export const useSalesUsers = () => {
  const fallback = [];
  const { data = fallback, refetch } = useQuery(queryKeys.sales, getSalesUsers);
  // const { isLoading } = useMutation(getSalesUsers)
  console.log(data)

  return {
    salesUsers: data,
    refetch,
    // isLoading,
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
