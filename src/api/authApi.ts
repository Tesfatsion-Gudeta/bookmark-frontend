import axiosInstance from "../utils/axiosInstance";

export interface createUserPayload {
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
}

export interface loginUserPayload {
  email: string;
  password: string;
}

export const signup = async (userData: createUserPayload) => {
  try {
    const { data } = await axiosInstance.post("/auth/signUp", userData);
    return data;
  } catch (error: any) {
    throw error?.response?.data || error;
  }
};

export const login = async (userData: loginUserPayload) => {
  try {
    const { data } = await axiosInstance.post("/auth/signin", userData);
    return data;
  } catch (error: any) {
    throw error?.response?.data || error;
  }
};

export const getProfile = async () => {
  try {
    const { data } = await axiosInstance.get("/users/me");
    return data;
  } catch (error: any) {
    throw error?.response?.data || error;
  }
};
