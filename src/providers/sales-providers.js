import { salesDB } from "../api/axios";

export const getSalesUsers = () => {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        const response = await salesDB.get("/users");
        if (response.status === 200) {
          resolve(response.data);
        }
      } catch (error) {
        reject(new Error(error.message));
      }
    }, 1000);
  });
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
