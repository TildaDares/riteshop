import React, { useEffect } from 'react'
import Meta from '@/components/layout/Meta'
import Loader from '@/components/layout/Loader'
import { Container, Typography } from '@mui/material'
import AdminRequestList from '@/components/requests/AdminRequestList'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack';
import { getError } from '@/utils/error'
import AdminProtected from '@/components/admin/AdminProtected'
import useRequests from '@/hooks/request/useRequests'

const AllRequests = () => {
  const router = useRouter()
  const { requests, noRequests, loading, error, count } = useRequests()
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  useEffect(() => {
    if (error) {
      closeSnackbar()
      router.push('/')
      enqueueSnackbar(getError(error), { variant: 'error' });
    }
  }, [router, error, closeSnackbar, enqueueSnackbar])

  if (loading) return <Loader />

  return (
    <Container sx={{ minHeight: '80vh' }}>
      <Meta title="Your Requests" />
      <Typography variant="h1" component="h1" sx={{ textAlign: 'center' }}>
        All Requests ({count})
      </Typography>
      {!requests || noRequests || requests.length == 0 ?
        <Typography sx={{ pt: 2, textAlign: 'center', fontSize: '1.2rem' }}>There are no requests to display</Typography>
        :
        <AdminRequestList requests={requests} />
      }
    </Container>
  )
}

export default AdminProtected(AllRequests)
