import React from 'react'
import Meta from '@/components/layout/Meta'
import Loader from '@/components/layout/Loader'
import useUsers from '@/hooks/user/useUsers'
import { Container, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import Error from '@/components/Error'
import { getError } from '@/utils/error'
import AdminProtected from '@/components/admin/AdminProtected'
import UserList from '@/components/users/UserList'

const AllUsers = () => {
  const router = useRouter()
  const { users, loading, error, count } = useUsers()

  if (loading) return <Loader />

  if (error) {
    return <Error message={getError(error)} />
  }

  return (
    <Container sx={{ minHeight: '80vh' }}>
      <Meta title="All Users" />
      <Typography variant="h1" component="h1" sx={{ textAlign: 'center' }}>
        All Users ({count ? count : 0})
      </Typography>
      {!users || users.length == 0 ?
        <Typography sx={{ pt: 2, textAlign: 'center', fontSize: '1.2rem' }}>There are no users to display</Typography>
        :
        <UserList users={users} />
      }
    </Container>
  )
}

export default AdminProtected(AllUsers)
