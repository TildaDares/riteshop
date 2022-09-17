import React, { useState } from 'react';
import {
  Typography,
  CircularProgress,
  Button,
  Container,
  ListItem,
} from '@mui/material';
import { useRouter } from 'next/router';
import CheckoutWizard from '@/components/checkout/CheckoutWizard';
import Protected from '@/components/auth/Protected';
import Meta from '@/components/layout/Meta';
import OrderDetail from '@/components/checkout/OrderDetail';
import PaypalCheckout from '@/components/checkout/PaypalCheckout';
import useOrder from '@/hooks/order/useOrder';
import Loader from '@/components/layout/Loader';
import { useSnackbar } from 'notistack';
import { getError } from '@/utils/error';
import { mutate } from 'swr';
import Error from '@/components/Error'
import useUser from '@/hooks/user/useUser';
import axiosInstance from '@/utils/axiosConfig'

const Order = () => {
  const router = useRouter();
  const id = router.query['id'] as string
  const { user: currentUser, loading: userLoader } = useUser()
  const { order, loading, error } = useOrder(id)
  const [loadingDeliver, setLoadingDeliver] = useState(false)
  const { enqueueSnackbar } = useSnackbar();

  async function deliverOrderHandler() {
    try {
      setLoadingDeliver(true)
      await axiosInstance.put(`orders/${id}`, { isDelivered: true, deliveredAt: new Date().toISOString() })
      setLoadingDeliver(false)
      enqueueSnackbar('Order successfully marked as delivered', { variant: 'success' })
      mutate(`orders/${id}`)
    } catch (err) {
      setLoadingDeliver(false)
      enqueueSnackbar(getError(err), { variant: 'error' })
    }
  }

  if (error) {
    return <Error message={getError(error)} />
  }

  if (loading || userLoader) return <Loader />

  return (
    <Container sx={{ minHeight: '80vh' }}>
      <Meta title="Order" />
      {order &&
        <>
          <CheckoutWizard activeStep={1} />
          <Typography component="h1" variant="h1" sx={{ py: 2 }} align="center">
            Order {order._id}
          </Typography>

          <OrderDetail
            items={order.items}
            shippingFee={order.shippingFee}
            itemsPrice={order.itemsPrice}
            total={order.total}
            shippingAddress={order.shippingAddress}
            isDelivered={order.isDelivered}
            isPaid={order.isPaid}
            user={order.user}
            deliveredAt={order.deliveredAt}>
            <>
              {!order.isPaid && (
                <ListItem>
                  <PaypalCheckout total={order.total} orderId={order._id} />
                </ListItem>
              )}
              {currentUser.role == 'admin' && order.isPaid && !order.isDelivered && (
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
        </>}
    </Container>
  );
}

export default Protected(Order)
