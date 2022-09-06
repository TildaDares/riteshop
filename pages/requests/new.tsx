import React from 'react'
import Layout from '@/components/Layout'
import useCreateRequest from '@/hooks/request/useCreateRequest'
import { getError } from '@/utils/error';
import { useSnackbar } from 'notistack';
import { mutate } from 'swr';
import Protected from '@/components/Protected'
import { Container, Typography } from '@mui/material';

const NewRequest = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const createRequest = useCreateRequest();
  return (
    <Layout>
      <Container maxWidth="sm" sx={{ minHeight: '80vh' }}>
        <Typography variant="h1" component="h1" sx={{ textAlign: 'center' }}>
          New Request
        </Typography>
      </Container>
    </Layout>
  )
}

export default Protected(NewRequest)