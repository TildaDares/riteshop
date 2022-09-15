import React, { useEffect } from 'react'
import Meta from '@/components/layout/Meta'
import Loader from '@/components/layout/Loader'
import useRequestsByUser from '@/hooks/request/useRequestsByUser'
import NextLink from 'next/link'
import { Box, Button, Container, Link, Typography } from '@mui/material'
import RequestList from '@/components/requests/RequestList'
import Protected from '@/components/auth/Protected'
import AddIcon from '@mui/icons-material/Add';
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack';
import { getError } from '@/utils/error'
import useUser from '@/hooks/user/useUser'

const Requests = () => {
  const router = useRouter()
  const { user } = useUser()
  const { requests, noRequests, loading, error } = useRequestsByUser(user?._id)
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
        Your Requests
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'end' }}>
        <Button variant="contained" startIcon={<AddIcon />}>
          <NextLink href="/requests/new">
            <Link sx={{ color: '#fff' }}>Create new Request</Link>
          </NextLink>
        </Button>
      </Box>
      {!requests || noRequests || requests.length == 0 ?
        <Typography sx={{ pt: 2, textAlign: 'center', fontSize: '1.2rem' }}>There are no requests to display</Typography>
        :
        <RequestList requests={requests} />
      }
    </Container>
  )
}

export default Protected(Requests)
