import axios from "axios";
import { useEffect, useState } from "react";

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



const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await publicRequest.get(url);
        setData(res.data);
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  return { data, loading, error};
};

export default useFetch;