import axios from "axios";
const BASE_URL = process.env.REACT_APP_BASE_URL;

const authorizedAxios = axios.create({
  baseURL: BASE_URL,
});


authorizedAxios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
)

export default authorizedAxios;
