import axiosInstance from "../utils/axiosInstance";

export interface createUserPayload {
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
}

export interface UpdateUserDto {
  firstName?: string;
  lastName?: string;
  email?: string;
}
export interface loginUserPayload {
  email: string;
  password: string;
}

const API_URL = "/users";

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
    const { data } = await axiosInstance.get(`${API_URL}/me`);
    return data;
  } catch (error: any) {
    throw error?.response?.data || error;
  }
};

export const updateUser = async (userData: UpdateUserDto) => {
  try {
    const { data } = await axiosInstance.patch(`${API_URL}`, userData);
    return data;
  } catch (error: any) {
    throw error?.response?.data || error;
  }
};
