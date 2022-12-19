import { useQuery } from "react-query";
import { salesDB } from "../../../api/axios";
import { queryKeys } from "../../../react-query/constants";

export const getSalesUsers = async () => {
  try {
    const response = await salesDB.get("/users");
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

export const useSalesUsers = () => {
  const fallback = [];
  const { data = fallback } = useQuery(queryKeys.sales, getSalesUsers);

  return {
    salesUsers: data,
  };
};
