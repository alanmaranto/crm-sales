import axios from "axios";

export const salesDB = axios.create({
  baseURL: "http://localhost:3000",
});

export const nationalRegistryDB = axios.create({
  baseURL: "http://localhost:3001",
});

export const nationalArchivesDB = axios.create({
  baseURL: "http://localhost:3002",
});
