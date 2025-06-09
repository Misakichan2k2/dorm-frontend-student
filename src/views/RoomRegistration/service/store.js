import { defineStore } from "pinia";
import { API_REGISTRATION } from "@/services/api";
import { RESPONSE } from "@/utils/response";

export const StoreRegistration = defineStore("StoreRegistration", () => {
  const { setup } = RESPONSE();
  const API = API_REGISTRATION.API_REGISTRATION;

  // Tạo mới đơn đăng ký
  const onActionCreateRegistration = async (data) => {
    return await setup({
      apiFunction: API.createRegistration(data),
    });
  };

  // Lấy đơn của chính user
  const onActionGetMyRegistration = async () => {
    try {
      return await setup({
        apiFunction: API.getMyRegistration(),
      });
    } catch (error) {
      console.error("Error fetching my registration:", error);
      throw new Error("Có lỗi khi lấy đơn đăng ký của bạn.");
    }
  };

  const onActionGetRooms = async () => {
    return await setup({
      apiFunction: API.getRooms(),
    });
  };

  const onActionCreateRenewal = async () => {
    return await setup({
      apiFunction: API.createRenewal(),
    });
  };

  const onActionCreateVnpayUrl = async (data) => {
    return await setup({
      apiFunction: API.createVnpayUrl(data),
    });
  };

  return {
    onActionCreateRegistration,
    onActionGetMyRegistration,
    onActionGetRooms,
    onActionCreateVnpayUrl,
    onActionCreateRenewal,
  };
});
