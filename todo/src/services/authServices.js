// services/authService.js
import unauthorizedAxios from "../axios/unauthorized";
import authorizedAxios from "../axios/authorized";

export const loginUser = async (data) => {
  const response = await unauthorizedAxios.post("/users/login", data);
  return response.data;
};


export const updatePassword = async ({ oldPassword, newPassword }) => {
  const response = await authorizedAxios.patch("/users/change_password", {
    oldPassword,
    newPassword,
  });
  return response.data;
};


export const signupUser = async (data) => {
  const response = await unauthorizedAxios.post("/users/signup", data);
  return response.data;
};


export const verifyEmail = async (token) => {
  const res = await unauthorizedAxios.post(`/users/verify/${token}`);
  return res.data;
};


export const forgotPassword = async (email) => {
  const response = await unauthorizedAxios.post(`/users/forgot_password/${email}`);
  return response.data;
};

export const resetPassword = async ({ token, newPassword }) => {
  const response = await unauthorizedAxios.post("/users/reset_password", {
    token,
    newPassword,
  });
  return response.data;
};

export const getAllUsers = async () => {
  const res = await authorizedAxios.get("/users/all");
  return res.data;
};