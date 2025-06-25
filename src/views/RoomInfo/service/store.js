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

  const onActionGetMyRenewals = async () => {
    return await setup({
      apiFunction: API.getMyRenewalRequestByRoom(),
    });
  };

  const onActionCreateRenewal = async (student) => {
    return await setup({
      apiFunction: API.createRenewal(student),
    });
  };

  const onActionCreateVnpayUrlRegistration = async (renewalRequestId) => {
    return await setup({
      apiFunction: API.createVnpayUrlRegistration(renewalRequestId),
    });
  };

  const onActionCreateVnpayUrl = async (renewalRequestId) => {
    return await setup({
      apiFunction: API.createVnpayUrl(renewalRequestId),
    });
  };

  const onActionGetRooms = async () => {
    return await setup({
      apiFunction: API.getRooms(),
    });
  };

  const onActionTransferRoom = async (id, data) => {
    return await setup({
      apiFunction: API.transferRoom(id, data),
    });
  };

  return {
    onActionGetMyRentedRoom,
    onActionGetMyRoomRequest,
    onActionGetMyRenewals,
    onActionCreateRenewal,
    onActionCreateVnpayUrlRegistration,
    onActionCreateVnpayUrl,
    onActionGetRooms,
    onActionTransferRoom,
  };
});
