import React from 'react'
import Meta from '@/components/layout/Meta'
import { Alert, Button, Container } from '@mui/material'
import { useRouter } from 'next/router'


const Error = ({ message }: { message: string }) => {
  const router = useRouter()
  return (
    <Container sx={{ minHeight: '80vh', mt: 2 }}>
      <Meta title="Error" />
      <Button variant="outlined" onClick={() => router.push('/')}>
        Go home
      </Button>
      <Alert variant="filled" severity="error" sx={{ mt: 2 }}>
        {/* {message} message is not user friendly */}
        Something unexpected happened. Please try again!
      </Alert>
    </Container>
  )
}

export default Error
