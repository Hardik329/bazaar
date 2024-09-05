import axios from "axios";

const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
// const TOKEN = store.getState()?.currentUser?.accessToken;

const currentUser = user && JSON.parse(user).currentUser;
const TOKEN = currentUser?.accessToken;

// const BASE_URL = "http://localhost:5000/api";
const BASE_URL = "https://fair-cyan-gazelle-tie.cyclic.app/api";

// const BASE_URL = "https://baazaar-backend.onrender.com/api";


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
