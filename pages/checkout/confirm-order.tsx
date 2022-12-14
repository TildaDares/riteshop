import React, { useEffect, useState, useRef } from 'react';
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
import Protected from '@/components/auth/Protected';
import Meta from '@/components/layout/Meta';
import useCart from '@/hooks/cart/useCart';
import OrderDetail from '@/components/checkout/OrderDetail';
import { mutate } from 'swr';
import Loader from '@/components/layout/Loader';
import axiosInstance from '@/utils/axiosConfig'

function ConfirmOrder() {
  const router = useRouter();
  const address = Cookies.get('shippingAddress') as string

  const shippingAddress = address ? JSON.parse(address) : ''
  const firstUpdate = useRef(true)

  const { cart, loading: cartLoader } = useCart()

  useEffect(() => {
    if (cartLoader) return

    if (!firstUpdate.current) return;
    firstUpdate.current = false;
    if (!shippingAddress) {
      router.push('/checkout')
    }

    if (!cart || cart.items.length === 0) {
      router.push('/cart');
    }
  }, [cart, cartLoader, router, shippingAddress])

  const shippingFee = cart?.bill <= 50 ? 0 : 15;
  const total = Math.round((cart?.bill + shippingFee));
  const { closeSnackbar, enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const placeOrderHandler = async () => {
    closeSnackbar();
    try {
      setLoading(true);
      const data = await axiosInstance.post(
        'orders',
        {
          shippingFee,
          shippingAddress
        }
      );
      setLoading(false);
      const id = data?.data?.order._id
      router.push(`/orders/${id}`);
      mutate('cart')
      Cookies.remove('shippingAddress');
    } catch (err) {
      setLoading(false);
      enqueueSnackbar(getError(err), { variant: 'error' });
    }
  };

  if (cartLoader) return <Loader />

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
        total={total}
        shippingAddress={shippingAddress}
        isDelivered={false}
        isPaid={false}
        user={cart.user}
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
