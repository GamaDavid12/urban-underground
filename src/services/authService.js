import { axiosAPI } from "../api/api.js";

export const loginUser = async (data) => {
  const res = await axiosAPI.post("auth/login", data);
  return res.data;
};

export const registerUser = async (data) => {
  const res = await axiosAPI.post("auth/register", data);
  return res.data;
};

export const forgotPassword = async (data) => {
  const res = await axiosAPI.post("auth/forgot-password", data);
  return res.data;
};

export const resetPassword = async (data) => {
  const res = await axiosAPI.post("auth/reset-password", data);
  return res.data;
};
