import { defineStore } from "pinia";
import { API_ROOM_INFO } from "./api";
import { RESPONSE } from "@/utils/response";

export const StoreRoomInfo = defineStore("StoreRoomInfo", () => {
  const { setup } = RESPONSE();
  const API = API_ROOM_INFO;

  // Lấy thông tin phòng đã thuê
  const onActionGetMyRentedRoom = async () => {
    return await setup({
      apiFunction: API.getMyRentedRoom(),
    });
  };

  // Lấy thông tin phòng đã đăng ký
  const onActionGetMyRoomRequest = async () => {
    return await setup({
      apiFunction: API.getMyRoomRequest(),
    });
  };

  const onActionCreateVnpayUrl = async (data) => {
    return await setup({
      apiFunction: API.createVnpayUrl(data),
    });
  };

  return {
    onActionGetMyRentedRoom,
    onActionGetMyRoomRequest,
    onActionCreateVnpayUrl,
  };
});
