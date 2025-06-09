import { AxiosInstance } from "@/services/api";

class ApiRegistration {
  // Tạo mới đơn đăng ký
  createRegistration = async (data) => {
    return await AxiosInstance({
      method: "POST",
      url: `registration`,
      data,
    });
  };

  // Lấy đơn đăng ký của chính user đang đăng nhập
  getMyRegistration = async () => {
    return await AxiosInstance({
      method: "GET",
      url: `registration/me`,
    });
  };

  getRooms = async () => {
    return await AxiosInstance({
      method: "GET",
      url: `rooms/available`,
    });
  };

  createVnpayUrl = async (data) => {
    return await AxiosInstance({
      method: "POST",
      url: `payments/create-registration-vnpay-payment`,
      data,
    });
  };
}

export const API_REGISTRATION = new ApiRegistration();
