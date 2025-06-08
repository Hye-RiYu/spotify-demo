import axios from "axios";
import { REACT_APP_SPOTIFY_BASE_URL } from "../configs/commonConfig";

const api = axios.create({
  baseURL: REACT_APP_SPOTIFY_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
