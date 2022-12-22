import {
  calculateArchivesScore,
  calculateNRScore,
  isDataMatches,
} from "../helpers/score";

describe("calculateArchivesScore", () => {
  it(`should return -100 if archivesUser was found
   (MEANS USER HAS JUDICIAL RECORDS IN ARCHIVES SYSTEM)`, () => {
    const archivesUser = {
      birthdate: "2000-01-01",
      email: "user@example.com",
      firstName: "John",
      lastName: "Doe",
    };
    const result = calculateArchivesScore(archivesUser);
    expect(result).toEqual(-100);
  });

  it(`should return 20 if archivesUser has an error property 
  (MEANS USER HAS NO JUDICIAL RECORDS IN ARCHIVES SYSTEM)`, () => {
    const archivesUser = { error: "Some error" };
    const result = calculateArchivesScore(archivesUser);
    expect(result).toEqual(20);
  });
});

describe("calculateNRScore", () => {
  it(`should return -100 if registryUser is not found 
  (MEANS USER IS NOT FOUND IN REGISTRY SYSTEM)`, async () => {
    const user = {
      birthdate: "2000-01-01",
      email: "user@example.com",
      firstName: "John",
      lastName: "Doe",
    };
    const registryUser = {
      error: true,
    };
    const score = await calculateNRScore(user, registryUser);
    expect(score).toEqual(-100);
  });

  it(`should return 20 if data matches registryUser 
  (MEANS USER IS VERIFIED BY REGISTRY SYSTEM)`, async () => {
    const user = {
      birthdate: "2000-01-01",
      email: "user@example.com",
      firstName: "John",
      lastName: "Doe",
    };
    const registryUser = {
      birthdate: "2000-01-01",
      email: "user@example.com",
      firstName: "John",
      lastName: "Doe",
    };
    const score = await calculateNRScore(user, registryUser);
    expect(score).toEqual(20);
  });

  it("should return -100 if data does not match registryUser", async () => {
    const user = {
      birthdate: "2000-01-01",
      email: "user@example.com",
      firstName: "John",
      lastName: "Doe",
    };
    const registryUser = {
      birthdate: "2001-01-01",
      email: "user@example.com",
      firstName: "John",
      lastName: "Doe",
    };
    const score = await calculateNRScore(user, registryUser);
    expect(score).toEqual(-100);
  });
});

describe("matches USER objects", () => {
  it("isDataMatches returns true if all keys:values matches", async () => {
    const obj1 = {
      birthdate: "01/01/1970",
      email: "john@example.com",
      firstName: "John",
      lastName: "Doe",
    };
    const obj2 = {
      birthdate: "01/01/1970",
      email: "john@example.com",
      firstName: "John",
      lastName: "Doe",
    };

    const result = await isDataMatches(obj1, obj2);
    expect(result).toBe(true);
  });

  it("should return false if the objects have different keys", () => {
    const obj1 = {
      birthdate: "01/01/1970",
      email: "john@example.com",
      firstName: "John",
      lastName: "Doe",
    };
    const obj2 = {
      birthdate: "01/01/1970",
      email: "john@example.com",
      firstName: "John",
      lastName: "Doe",
      nickname: "Johncito",
    };
    expect(isDataMatches(obj1, obj2)).toBe(false);
  });

  it("isDataMatches returns false for non-matching objects", async () => {
    const obj1 = {
      birthdate: "01/01/1970",
      email: "john@example.com",
      firstName: "John",
      lastName: "Doe",
    };
    const obj2 = {
      birthdate: "01/01/1971",
      email: "john@example.com",
      firstName: "John",
      lastName: "Doe",
    };

    const result = await isDataMatches(obj1, obj2);
    expect(result).toBe(false);
  });
});
