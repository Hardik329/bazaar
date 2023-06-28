import axios from "axios";

const user = JSON.parse(localStorage.getItem("persist:root"))?.user;

const currentUser = user && JSON.parse(user).currentUser;
const TOKEN = currentUser?.accessToken;

const BASE_URL = "https://baazaar-backend.onrender.com/api";

export const fetchData = (url) => axios.get(url);

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${TOKEN}` },
});
