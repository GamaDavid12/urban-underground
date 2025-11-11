import axios from "axios";

export const axiosAPI = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 5000,
});

axiosAPI.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
