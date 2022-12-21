import { scores } from "../constants";

export const getSalesScore = () => Math.round(Math.random() * 100);

export const isDataMatches = async (obj1, obj2) => {
  console.log(obj1);
  console.log(obj2);
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  // If the objects have a different number of keys, they can't be equal
  if (keys1.length !== keys2.length) {
    return false;
  }
  // Compare the values for each key
  for (let i = 0; i < keys1.length; i++) {
    const key = keys1[i];
    if (obj1[key] !== obj2[key]) {
      return false;
    }
  }
  // If we've reached this point, the objects have the same keys and values
  return true;
};

export const calculateNRScore = async (user, registryUser) => {
  let score = 0;

  const { birthdate, email, firstName, lastName } = user;
  const userToCompare = {
    birthdate,
    email,
    firstName,
    lastName,
  };

  if (registryUser.error) {
    score += scores.NR_NOT_FOUND;
  } else {
    const matches = await isDataMatches(userToCompare, registryUser);
    if (matches) {
      score += scores.NR_VALIDATED;
    } else {
      score += scores.NR_WRONG_DATA;
    }
  }

  return score;
};

export const calculateArchivesScore = (archivesUser) => {
  if (!archivesUser.error) {
    return scores.NA_YES_RECORDS;
  } else {
    return scores.NA_NO_RECORDS;
  }
};

export const calculateSalesScore = () => {
  return getSalesScore();
};

export const calculateScore = async (user, registryUser, archivesUser) => {
  const registryScore = await calculateNRScore(user, registryUser);
  const archivesScore = calculateArchivesScore(archivesUser);
  const salesScore = calculateSalesScore();

/*   console.log("registryScore", registryScore);
  console.log("archivesScore", archivesScore);
  console.log("salesScore", salesScore); */

  return registryScore + archivesScore + salesScore;
};
