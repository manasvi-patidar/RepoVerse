import { loginRequest, registerRequest } from "../api/authApi.js";

// Login User
export const login = async (formData) => {
  try {
    const response = await loginRequest(formData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Register User
export const register = async (formData) => {
  try {
    const response = await registerRequest(formData);
    return response.data;
  } catch (error) {
    throw error;
  }
};
