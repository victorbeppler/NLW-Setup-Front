import axios from "axios";

export const api = axios.create({
  baseURL: "http://190.123.193.62:4005",
});

