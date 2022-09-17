import { getError } from "@/utils/error";
import { mutate } from "swr";
import axiosInstance from '@/utils/axiosConfig'

interface PaypalTransaction {
  orderID: string;
}

export const createPaypalTransaction = async (total: number): Promise<PaypalTransaction> => {
  try {
    const url = `orders/create-paypal-transaction`;
    const data = await axiosInstance.post(url, { total });
    const paypalTransaction: PaypalTransaction = {
      orderID: data?.data?.order.id,
    };

    return paypalTransaction;
  } catch (error) {
    throw new Error(getError(error));
  }
};

export const capturePayment = async (paypalOrderId: string, orderID: string): Promise<void> => {
  try {
    const url = `orders/capture-payment/${orderID}`;
    const data = await axiosInstance.post(url, { paypalOrderId });
    mutate(`orders/${orderID}`)
    return data?.data
  } catch (error) {
    throw new Error(getError(error));
  }
};

export const CheckoutService = {
  createPaypalTransaction,
  capturePayment,
};
