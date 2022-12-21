export const isDataMatches = async (obj1, obj2) => {
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
