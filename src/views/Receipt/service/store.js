import { defineStore } from "pinia";
import { API_INVOICE } from "./api";
import { RESPONSE } from "@/utils/response";

export const StoreInvoice = defineStore("StoreInvoice", () => {
  const { setup } = RESPONSE();
  const API = API_INVOICE;

  const onActionGetMyElectricInvoice = async () => {
    return await setup({
      apiFunction: API.getMyElectricInvoice(),
    });
  };

  const onActionGetMyWaterInvoice = async () => {
    return await setup({
      apiFunction: API.getMyWaterInvoice(),
    });
  };

  // Tạo thanh toán (VNPAY)
  const onActionCreateElectricPaymentURrl = async (data) => {
    return await setup({
      apiFunction: API.createElectricPaymentUrl(data),
    });
  };

  // Tạo thanh toán (VNPAY)
  const onActionCreateWaterPaymentURrl = async (data) => {
    return await setup({
      apiFunction: API.createWaterPaymentUrl(data),
    });
  };

  return {
    onActionGetMyElectricInvoice,
    onActionGetMyWaterInvoice,
    onActionCreateElectricPaymentURrl,
    onActionCreateWaterPaymentURrl,
  };
});
