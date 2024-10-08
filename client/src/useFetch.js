import axios from "axios";
import { BASE_URL } from "./utils/constants";

const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
// const TOKEN = store.getState()?.currentUser?.accessToken;

const currentUser = user && JSON.parse(user).currentUser;
const TOKEN = currentUser?.accessToken;


export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${TOKEN}` },
});

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});
export const makeRequest = (token) => {
  const userRequest = axios.create({
    baseURL: BASE_URL,
    headers: { token: `Bearer ${token}` },
  });
  return { userRequest };
};
