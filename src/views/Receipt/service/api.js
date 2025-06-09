import { AxiosInstance } from "@/services/api";

class ApiInvoice {
  getMyElectricInvoice = async () => {
    return await AxiosInstance({
      method: "GET",
      url: "electric-invoices/me",
    });
  };

  getMyWaterInvoice = async () => {
    return await AxiosInstance({
      method: "GET",
      url: "water-invoices/me",
    });
  };

  createElectricPaymentUrl = async (data) => {
    return await AxiosInstance({
      method: "POST",
      url: "payments/create-electric-vnpay-payment",
      data,
    });
  };

  createWaterPaymentUrl = async (data) => {
    return await AxiosInstance({
      method: "POST",
      url: "payments/create-water-vnpay-payment",
      data,
    });
  };
}

export const API_INVOICE = new ApiInvoice();
