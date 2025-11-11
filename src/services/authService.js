import { axiosAPI } from "../api/api.js";
import { API_ROUTES, AUTH_ROUTES } from "../api/APIRoutes/index.js";

export const loginUser = async (data) => {
  const url = `${API_ROUTES.AUTH}${AUTH_ROUTES.LOGIN}`;
  const res = await axiosAPI.post(url, data);
  return res.data;
};

export const registerUser = async (data) => {
  const url = `${API_ROUTES.AUTH}${AUTH_ROUTES.REGISTER}`;
  const res = await axiosAPI.post(url, data);
  return res.data;
};

export const forgotPassword = async (data) => {
  const url = `${API_ROUTES.AUTH}${AUTH_ROUTES.FORGOT_PASSWORD}`;
  const res = await axiosAPI.post(url, data);
  return res.data;
};

export const resetPassword = async (data) => {
  const url = `${API_ROUTES.AUTH}${AUTH_ROUTES.RESET_PASSWORD}`;
  const res = await axiosAPI.post(url, data);
  return res.data;
};