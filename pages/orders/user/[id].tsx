import React from 'react'
import Meta from '@/components/Meta'
import Loader from '@/components/Loader'
import useUserOrders from '@/hooks/order/useUserOrders'
import { Container, Typography } from '@mui/material'
import OrderList from '@/components/OrderList'
import Protected from '@/components/Protected'
import { useRouter } from 'next/router'

const UserOrders = () => {
  const router = useRouter()
  const id = router.query['id'] as string
  const { orders, loading } = useUserOrders(id)

  if (loading) return <Loader />

  return (
    <Container sx={{ minHeight: '80vh' }}>
      <Meta title="Your Orders" />
      <Typography variant="h1" component="h1" sx={{ textAlign: 'center' }}>
        Your Orders
      </Typography>
      {!orders || orders.length == 0 ?
        <Typography sx={{ pt: 2, textAlign: 'center', fontSize: '1.2rem' }}>There are no orders to display</Typography>
        :
        <OrderList orders={orders} />
      }
    </Container>
  )
}

export default Protected(UserOrders)
