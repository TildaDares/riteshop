import React from 'react'
import Meta from '@/components/layout/Meta'
import Loader from '@/components/layout/Loader'
import useOrders from '@/hooks/order/useOrders'
import { Container, Typography } from '@mui/material'
import OrderList from '@/components/orders/OrderList'
import Error from '@/components/Error'
import { getError } from '@/utils/error'
import AdminProtected from '@/components/admin/AdminProtected'

const AllOrders = () => {
  const { orders, loading, error, count } = useOrders()

  if (loading) return <Loader />

  if (error) {
    return <Error message={getError(error)} />
  }

  return (
    <Container sx={{ minHeight: '80vh' }}>
      <Meta title="All Orders" />
      <Typography variant="h1" component="h1" sx={{ textAlign: 'center' }}>
        All Orders ({count})
      </Typography>
      {!orders || orders.length == 0 ?
        <Typography sx={{ pt: 2, textAlign: 'center', fontSize: '1.2rem' }}>There are no orders to display</Typography>
        :
        <OrderList orders={orders} />
      }
    </Container>
  )
}

export default AdminProtected(AllOrders)
