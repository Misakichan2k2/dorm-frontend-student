import { AxiosInstance } from "@/services/api";

class ApiAuth {
  signIn = async (data) => {
    return await AxiosInstance({
      method: "POST",
      url: "auth/signin",
      data: {
        email: data?.email || "",
        password: data?.password || "",
      },
    });
  };

  signUp = async (data) => {
    return await AxiosInstance({
      method: "POST",
      url: "auth/signup",
      data: {
        fullname: data?.fullname || "",
        email: data?.email || "",
        password: data?.password || "",
      },
    });
  };

  hasRegistration = async () => {
    return await AxiosInstance({
      method: "GET",
      url: "registration/hasRegistration",
    });
  };

  changePassword = async (data) => {
    return await AxiosInstance({
      method: "PUT",
      url: "auth/change-password",
      data,
    });
  };
}

export const API_AUTH = new ApiAuth();
