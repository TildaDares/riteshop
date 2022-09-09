import React, { useRef, useState, useEffect } from 'react'
import Script from 'next/script';
import { CheckoutService } from '@/services/CheckoutService';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/router'
import { Container } from '@mui/material';

declare const window: Window &
  typeof globalThis & {
    paypal: any;
  };

interface ErrorMsg {
  message: string;
}

interface PaypalData {
  orderID: string;
}

const PaypalCheckout = ({ total, orderId }: { total: number, orderId: string }) => {
  const [sdkReady, setSdkReady] = useState(false);
  const paypalButtonsRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  useEffect(() => {
    if (window.paypal) {
      window.paypal
        .Buttons({
          createOrder: function () {
            return CheckoutService.createPaypalTransaction(total).then((data) => {
              return data.orderID;
            });
          },
          onError: function (error: ErrorMsg) {
            enqueueSnackbar(error.message, { variant: 'error' });
          },
          onApprove: function (data: PaypalData) {
            closeSnackbar()
            return CheckoutService.capturePayment(data.orderID, orderId).then(() => {
              enqueueSnackbar('Transaction successfully completed!', { variant: 'success' });
              router.push('/');
            });
          },
        })
        .render(paypalButtonsRef.current);
    }
  }, [sdkReady])

  function handleLoad() {
    setSdkReady(true)
  }

  return (
    <>
      <Script src={`https://www.paypal.com/sdk/js?client-id=${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}&currency=USD`} onLoad={handleLoad}></Script>
      <Container sx={{ width: '100%' }} id="paypal-button-container" ref={paypalButtonsRef} />
    </>
  )
}

export default PaypalCheckout
