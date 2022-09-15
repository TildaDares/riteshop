import React from 'react'
import OrdersByUser from '@/components/orders/UserOrders'
import useUser from '@/hooks/user/useUser'
import Protected from '@/components/auth/Protected'
import Loader from '@/components/layout/Loader'

const UserOrders = () => {
  const { user, loading } = useUser()

  if (loading) return <Loader />

  return (
    user && <OrdersByUser title='Your Orders' id={user._id} />
  )
}

export default Protected(UserOrders)
