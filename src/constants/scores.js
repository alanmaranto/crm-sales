// NR stands for National Registry
// NA stands for National Archives

export const scores = {
  NR_VALIDATED: 20, // Found and matched with sale user information
  NR_NOT_FOUND: -20, // Not found or inconsistent data
  NR_WRONG_DATA: -20, //Found with wrong data
  NA_NO_RECORDS: 20, // Not Found or no judicial records
  NA_YES_RECORDS: -20, // Found with judicial records
};
