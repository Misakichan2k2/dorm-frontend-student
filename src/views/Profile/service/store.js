import { defineStore } from "pinia";
import { API_STUDENT_PROFILE } from "./api";
import { RESPONSE } from "@/utils/response";

export const StoreStudentProfile = defineStore("StoreStudentProfile", () => {
  const { setup } = RESPONSE();

  // Lấy thông tin profile
  const onActionGetMyProfileRegistration = async () => {
    return await setup({
      apiFunction: API_STUDENT_PROFILE.getMyProfileRegistration(),
    });
  };

  return {
    onActionGetMyProfileRegistration,
  };
});
