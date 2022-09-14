import React from 'react'
import { useRouter } from 'next/router'
import AdminProtected from '@/components/admin/AdminProtected'
import OrdersByUser from '@/components/orders/UserOrders'

const UserOrders = () => {
  const router = useRouter()
  const id = router.query['id'] as string

  return (
    <OrdersByUser title='Orders' id={id} />
  )
}

export default AdminProtected(UserOrders)
