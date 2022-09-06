import React from 'react'
import Layout from '@/components/Layout'
import Loader from '@/components/Loader'
import useRequests from '@/hooks/request/useRequests'
import NextLink from 'next/link'
import { Box, Button, Container, Link, Typography } from '@mui/material'
import RequestList from '@/components/RequestList'
import Protected from '@/components/Protected'
import AddIcon from '@mui/icons-material/Add';

const Requests = () => {
  const { requests, noRequests, loading } = useRequests()

  if (loading) return <Loader />

  return (
    <Layout>
      <Container sx={{ minHeight: '80vh' }}>
        <Typography variant="h1" component="h1" sx={{ textAlign: 'center' }}>
          Your Requests
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'end' }}>
          <Button variant="contained" startIcon={<AddIcon />}>
            <NextLink href="requests/new">
              <Link sx={{ color: '#fff' }}>Create new Request</Link>
            </NextLink>
          </Button>
        </Box>
        {noRequests || requests.length == 0 ?
          <Typography sx={{ pt: 2, textAlign: 'center', fontSize: '1.2rem' }}>There are no requests to display</Typography>
          :
          <RequestList requests={requests} />
        }
      </Container>
    </Layout>
  )
}

export default Protected(Requests)