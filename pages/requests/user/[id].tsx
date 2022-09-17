import React from 'react'
import Meta from '@/components/layout/Meta'
import Loader from '@/components/layout/Loader'
import useRequestsByUser from '@/hooks/request/useRequestsByUser'
import { Container, Typography } from '@mui/material'
import RequestList from '@/components/requests/RequestList'
import { useRouter } from 'next/router'
import { getError } from '@/utils/error'
import Error from '@/components/Error'
import AdminProtected from '@/components/admin/AdminProtected'

const Requests = () => {
  const router = useRouter()
  const id = router.query['id'] as string
  const { requests, loading, error } = useRequestsByUser(id)

  if (loading) return <Loader />

  if (error) {
    return <Error message={getError(error)} />
  }

  return (
    <Container sx={{ minHeight: '80vh' }}>
      <Meta title="Requests" />
      <Typography variant="h1" component="h1" sx={{ textAlign: 'center' }}>
        Requests
      </Typography>
      {!requests || requests.length == 0 ?
        <Typography sx={{ pt: 2, textAlign: 'center', fontSize: '1.2rem' }}>There are no requests to display</Typography>
        :
        <RequestList requests={requests} />
      }
    </Container>
  )
}

export default AdminProtected(Requests)
