import React from 'react'
import { CheckoutService } from '@/services/CheckoutService';
import { useSnackbar } from 'notistack';
import {
  PayPalButtons,
  usePayPalScriptReducer
} from "@paypal/react-paypal-js";
import { CircularProgress } from '@mui/material';

interface ErrorMsg {
  message: string;
}

interface PaypalData {
  orderID: string;
}

const PaypalCheckout = ({ total, orderId }: { total: number, orderId: string }) => {
  const [{ isPending }] = usePayPalScriptReducer();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  return (
    <>
      {isPending && <CircularProgress />}
      <PayPalButtons
        createOrder={() => {
          return CheckoutService.createPaypalTransaction(total).then((data) => {
            return data.orderID;
          })
        }}
        onError={(error: any) => {
          enqueueSnackbar(error.message, { variant: 'error' });
        }}
        onApprove={(data: PaypalData) => {
          closeSnackbar()
          return CheckoutService.capturePayment(data.orderID, orderId).then(() => {
            enqueueSnackbar('Transaction successfully completed!', { variant: 'success' });
          });
        }}
      />
    </>
  )
}

export default PaypalCheckout
