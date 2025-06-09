import { AxiosInstance } from "@/services/api";

class ApiReport {
  createReport = async (data) => {
    return await AxiosInstance({
      method: "POST",
      url: "reports",
      data,
    });
  };

  getMyRoomReport = async () => {
    return await AxiosInstance({
      method: "GET",
      url: "reports/me",
    });
  };

  cancelReport = async (id) => {
    return await AxiosInstance({
      method: "PUT",
      url: `reports/${id}/cancel`,
    });
  };
}

export const API_REPORT = new ApiReport();
