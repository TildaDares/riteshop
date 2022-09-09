import React, { useEffect, useState } from 'react';
import {
  Typography,
  CircularProgress,
  Button,
  Container,
  ListItem,
} from '@mui/material';
import { useRouter } from 'next/router';
import CheckoutWizard from '@/components/checkout/CheckoutWizard';
import { useSnackbar } from 'notistack';
import { getError } from '@/utils/error';
import Cookies from 'js-cookie';
import Protected from '@/components/Protected';
import Meta from '@/components/Meta';
import useCart from '@/hooks/cart/useCart';
import { postData } from '@/utils/fetchData';
import OrderDetail from '@/components/checkout/OrderDetail';
import { mutate } from 'swr';

function ConfirmOrder() {
  const router = useRouter();
  const address = Cookies.get('shippingAddress') as string

  const shippingAddress = address ? JSON.parse(address) : ''
  const { cart, noCart } = useCart()
  const shippingFee = cart.bill <= 50 ? 0 : 15;
  const totalPrice = Math.round((cart.bill + shippingFee));

  useEffect(() => {
    if (!shippingAddress) {
      router.push('/checkout')
    }
    if (noCart || cart.items.length === 0) {
      router.push('/cart');
    }
  }, []);

  const { closeSnackbar, enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const placeOrderHandler = async () => {
    closeSnackbar();
    try {
      setLoading(true);
      console.log(shippingAddress)
      const data = await postData(
        'orders',
        {
          shippingFee,
          shippingAddress
        }
      );
      setLoading(false);
      router.push(`/orders/${data.order._id}`);
      mutate('cart')
      Cookies.remove('shippingAddress');
    } catch (err) {
      setLoading(false);
      enqueueSnackbar(getError(err), { variant: 'error' });
    }
  };

  return (
    <Container sx={{ minHeight: '80vh' }}>
      <Meta title="Checkout" />
      <CheckoutWizard activeStep={1} />
      <Typography component="h1" variant="h1" sx={{ py: 2 }} align="center">
        Confirm Order
      </Typography>

      <OrderDetail
        items={cart.items}
        shippingFee={shippingFee}
        itemsPrice={cart.bill}
        totalPrice={totalPrice}
        shippingAddress={shippingAddress}
        isDelivered={false}
        isPaid={false}
      >
        <>
          <ListItem>
            <Button
              onClick={placeOrderHandler}
              variant="contained"
              color="primary"
              fullWidth
            >
              Place Order
            </Button>
          </ListItem>
          {loading && (
            <ListItem>
              <CircularProgress />
            </ListItem>
          )}
        </>
      </OrderDetail>
    </Container>
  );
}

export default Protected(ConfirmOrder)
