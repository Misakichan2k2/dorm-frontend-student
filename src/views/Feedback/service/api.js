import { AxiosInstance } from "@/services/api";

class ApiFeedback {
  createFeedback = async (data) => {
    return await AxiosInstance({
      method: "POST",
      url: "feedbacks",
      data,
    });
  };
}

export const API_FEEDBACK = new ApiFeedback();
