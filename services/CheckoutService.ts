import { getError } from "@/utils/error";
import { postData } from "@/utils/fetchData";
import { mutate } from "swr";

interface PaypalTransaction {
  orderID: string;
}

export const createPaypalTransaction = async (total: number): Promise<PaypalTransaction> => {
  try {
    const url = `orders/create-paypal-transaction`;
    const data = await postData(url, { total });
    const paypalTransaction: PaypalTransaction = {
      orderID: data.order.id,
    };

    return paypalTransaction;
  } catch (error) {
    throw new Error(getError(error));
  }
};

export const capturePayment = async (paypalOrderId: string, orderID: string): Promise<void> => {
  try {
    const url = `orders/capture-payment/${orderID}`;
    const data = await postData(url, { paypalOrderId });
    mutate(`orders/${orderID}`)
    return data
  } catch (error) {
    throw new Error(getError(error));
  }
};

export const CheckoutService = {
  createPaypalTransaction,
  capturePayment,
};
