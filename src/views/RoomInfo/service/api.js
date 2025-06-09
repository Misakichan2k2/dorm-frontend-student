import { AxiosInstance } from "@/services/api";

class ApiRoomInfo {
  getMyRentedRoom = async () => {
    return await AxiosInstance({
      method: "GET",
      url: "students/me",
    });
  };

  getMyRoomRequest = async () => {
    return await AxiosInstance({
      method: "GET",
      url: "registration/history",
    });
  };

  // Create
  createRenewal = async (data) => {
    return await AxiosInstance({
      method: "POST",
      url: "renewals",
      data,
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

export const API_ROOM_INFO = new ApiRoomInfo();
