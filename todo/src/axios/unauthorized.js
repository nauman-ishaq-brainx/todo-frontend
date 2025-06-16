import axios from "axios";
const BASE_URL = process.env.REACT_APP_BASE_URL;
const unauthorizedAxios = axios.create({
  baseURL: BASE_URL,
});

export default unauthorizedAxios;
