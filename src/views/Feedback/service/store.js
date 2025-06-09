import { defineStore } from "pinia";
import { API_FEEDBACK } from "./api";
import { RESPONSE } from "@/utils/response";

export const StoreFeedback = defineStore("StoreFeedback", () => {
  const { setup } = RESPONSE();
  const API = API_FEEDBACK;

  const onActionCreateFeedback = async (data) => {
    return await setup({
      apiFunction: API.createFeedback(data),
    });
  };

  return {
    onActionCreateFeedback,
  };
});
