import { Constants } from "@/config";
import { BACKEND_BASE_URL } from "@/config/env";
import axios, { AxiosError, AxiosResponse } from "axios";

const axiosInstance = axios.create({
  baseURL: BACKEND_BASE_URL,
});

axiosInstance.defaults.withCredentials = true;

// Request interceptor (if needed for adding authorization token, etc.)
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(Constants.LocalStorageKeys.JWTToken);
    config.headers["Authorization"] = `Bearer ${token}`;
    return config;
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  }
);

// Response interceptor for handling success and errors globally
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data;
  },
  (error: AxiosError) => {
    console.log(`Error: ${error.message}`);

    return Promise.reject(error.response?.data);
  }
);

export default axiosInstance;
