import { defineStore } from "pinia";
import { API_REPORT } from "./api";
import { RESPONSE } from "@/utils/response";

export const StoreReport = defineStore("StoreReport", () => {
  const { setup } = RESPONSE();
  const API = API_REPORT;

  const onActionCreateReport = async (data) => {
    return await setup({
      apiFunction: API.createReport(data),
    });
  };

  const onActionGetMyRoomReport = async () => {
    return await setup({
      apiFunction: API.getMyRoomReport(),
    });
  };

  const onActionCancelReport = async (reportId) => {
    return await setup({
      apiFunction: API.cancelReport(reportId),
    });
  };

  return {
    onActionCreateReport,
    onActionGetMyRoomReport,
    onActionCancelReport,
  };
});
