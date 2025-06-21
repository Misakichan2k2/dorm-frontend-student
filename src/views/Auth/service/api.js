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

  verifyEmail = async (token) => {
    return await AxiosInstance({
      method: "GET",
      url: `auth/verify-email?token=${token}`,
    });
  };

  forgetPassword = async (email) => {
    return await AxiosInstance({
      method: "GET",
      url: "auth/forgot-password",
      params: { email },
    });
  };

  resetPassword = async ({ token, newPassword }) => {
    return await AxiosInstance({
      method: "POST",
      url: `auth/reset-password`,
      data: { token, newPassword },
    });
  };
}

export const API_AUTH = new ApiAuth();
