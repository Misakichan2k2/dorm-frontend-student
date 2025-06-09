// import axios from "axios";

// const api = axios.create({
//   baseURL: "http://localhost:3000/api", // Đặt URL backend của bạn
//   withCredentials: true, // Để gửi cookie (như access_token)
// });

// export default api;

import { appLocalStorage } from "@/utils";
import axios from "axios";

export * as API_AUTH from "@/views/Auth/service/api";
export * as API_REGISTRATION from "@/views/RoomRegistration/service/api";
export * as API_STUDENT_PROFILE from "@/views/Profile/service/api";
export * as API_ROOM_INFO from "@/views/RoomInfo/service/api";
export * as API_INVOICE from "@/views/Receipt/service/api";
export * as API_REPORT from "@/views/Report/service/api";
export * as API_FEEDBACK from "@/views/Feedback/service/api";

class ApiApp {}

export const API_APP = new ApiApp();

const AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL_API,
});

const updateAuthorizationHeader = (token) => {
  if (token) {
    AxiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete AxiosInstance.defaults.headers.common["Authorization"];
  }
};

AxiosInstance.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${appLocalStorage.value.accessToken}`;
  if (config) return config;
});

AxiosInstance.interceptors.response.use(
  (response) => {
    if (response) return response;
  },
  (error) => {
    // if (["TOKEN_EXPIRED"].includes(error?.response?.data?.statusCode)) {
    //   onDeleteAppLocalStorage();
    // }

    return Promise.reject(error);
  }
);

export { AxiosInstance, updateAuthorizationHeader };
