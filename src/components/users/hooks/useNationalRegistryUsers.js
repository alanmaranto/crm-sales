import { nationalArchivesDB, nationalRegistryDB } from "../../../api/axios";
import { scores } from "../../../constants/scores";

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
        score: scores.NR_NOT_FOUND,
      };
    }
  }
};

export const getArchiveUserByNationalId = async (id) => {
  try {
    const response = await nationalArchivesDB.get(`/users/${id}`);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    throw new Error(error.message);
  }
};
