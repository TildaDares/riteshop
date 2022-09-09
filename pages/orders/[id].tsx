import React, { useState } from 'react';
import Error from 'next/error'
import {
  Typography,
  CircularProgress,
  Button,
  Container,
  ListItem,
} from '@mui/material';
import { useRouter } from 'next/router';
import CheckoutWizard from '@/components/checkout/CheckoutWizard';
import Protected from '@/components/Protected';
import Meta from '@/components/Meta';
import OrderDetail from '@/components/checkout/OrderDetail';
import PaypalCheckout from '@/components/checkout/PaypalCheckout';
import useOrder from '@/hooks/order/useOrder';
import Loader from '@/components/Loader';

const Order = () => {
  const router = useRouter();
  const { order, loading, error } = useOrder(router.query.id as string)
  const [loadingDeliver, setLoadingDeliver] = useState(false)

  async function deliverOrderHandler() {
  }

  if (error) {
    return <Error statusCode={error?.response?.data?.status} />
  }

  if (loading) {
    return <Loader />
  }

  return (
    <Container sx={{ minHeight: '80vh' }}>
      <Meta title="Checkout" />
      <CheckoutWizard activeStep={1} />
      <Typography component="h1" variant="h1" sx={{ py: 2 }} align="center">
        Order {order._id}
      </Typography>

      <OrderDetail
        items={order.items}
        shippingFee={order.shippingFee}
        itemsPrice={order.itemsPrice}
        totalPrice={order.total}
        shippingAddress={order.shippingAddress}
        isDelivered={order.isDelivered}
        isPaid={order.isPaid}
        deliveredAt={order.deliveredAt}>
        <>
          {!order.isPaid && (
            <ListItem>
              {loading ? (
                <CircularProgress />
              ) : (
                <PaypalCheckout total={order.total} orderId={order._id} />
              )}
            </ListItem>
          )}
          {order.isPaid && !order.isDelivered && (
            <ListItem>
              {loadingDeliver && <CircularProgress />}
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={deliverOrderHandler}
              >
                Mark as Delivered
              </Button>
            </ListItem>
          )}
        </>
      </OrderDetail>
    </Container>
  );
}

export default Protected(Order)
