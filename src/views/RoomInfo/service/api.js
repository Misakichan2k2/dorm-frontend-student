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

  getMyRenewalRequestByRoom = async () => {
    return await AxiosInstance({
      method: "GET",
      url: "/renewals/my-renewals",
    });
  };

  // Create
  createRenewal = async (student) => {
    return await AxiosInstance({
      method: "POST",
      url: "renewals",
      data: { student },
    });
  };

  createVnpayUrlRegistration = async (data) => {
    return await AxiosInstance({
      method: "POST",
      url: `payments/create-registration-vnpay-payment`,
      data,
    });
  };

  createVnpayUrl = async (renewalRequestId) => {
    return await AxiosInstance({
      method: "POST",
      url: `payments/create_payment_url`,
      data: { renewalRequestId },
    });
  };

  getRooms = async () => {
    return await AxiosInstance({
      method: "GET",
      url: "rooms/available",
    });
  };

  transferRoom = async (id, data) => {
    return await AxiosInstance({
      method: "PUT",
      url: `registration/${id}`,
      data,
    });
  };
}

export const API_ROOM_INFO = new ApiRoomInfo();
