import { nationalArchivesDB, nationalRegistryDB } from "../api/axios";

export const getArchiveUserByNationalId = async (id) => {
  try {
    const response = await nationalArchivesDB.get(`/users/${id}`);
    if (response.status === 200) {
      const { data } = response;
      delete data.id;
      return response.data;
    }
  } catch (error) {
    if (error.response.status === 404) {
      return {
        error: "User's judicial records not found",
      };
    }
  }
};

export const getRegistryUserByNationalId = async (id) => {
  try {
    let response = await nationalRegistryDB.get(`/users/${id}`);
    if (response.status === 200) {
      const { data } = response;
      delete data.id;
      return response.data;
    }
  } catch (error) {
    if (error.response.status === 404) {
      return {
        error: "User not found",
      };
    }
  }
};
