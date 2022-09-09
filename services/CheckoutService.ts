import { getError } from "@/utils/error";
import { postData } from "@/utils/fetchData";

interface PaypalTransaction {
  orderID: string;
}

export const createPaypalTransaction = async (total: number): Promise<PaypalTransaction> => {
  try {
    const url = `orders/create-paypal-transaction`;
    const data = await postData(url, { total });
    console.log(data)
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
    return await postData(url, { paypalOrderId });
  } catch (error) {
    throw new Error(getError(error));
  }
};

export const CheckoutService = {
  createPaypalTransaction,
  capturePayment,
};
