import axios from "axios";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
  baseURL: process.env.API_URL,
  timeout: 0,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    let token = Cookies.get("access_token"); // Renamed from "arx_auth_token"

    // if (!token) {
    //   try {
    //     const response = await axios.post(
    //       `${process.env.API_URL}/api/auth/refresh-token`,
    //       {},
    //       { withCredentials: true }
    //     );
    //     token = response.data.accessToken;
    //     Cookies.set("access_token", token); // Renamed token
    //   } catch (error) {
    //     console.error("Unable to refresh token", error);
    //   }
    // }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      // Token might be expired, try to refresh it
      try {
        const response = await axios.post(
          `${process.env.API_URL}/api/auth/refresh-token`,
          {},
          { withCredentials: true }
        );
        const newToken = response.data.accessToken;
        Cookies.set("access_token", newToken); // Renamed token
        error.config.headers.Authorization = `Bearer ${newToken}`;
        return axiosInstance(error.config); // Retry the original request
      } catch (refreshError) {
        console.error("Token refresh failed", refreshError);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
