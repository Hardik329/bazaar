import axios from "axios";


const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
console.log(user)

const currentUser = user && JSON.parse(user).currentUser;
const TOKEN = currentUser?.accessToken;
console.log(currentUser)

const BASE_URL = "http://localhost:5000/api";

export const fetchData = (url) => axios.get(url);

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${TOKEN}` },
});

