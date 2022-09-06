import React from 'react'
import Layout from '@/components/Layout'
import { Box, Container, Typography } from '@mui/material'
import useCart from '@/hooks/cart/useCart'
import Protected from '@/components/Protected';
import Loader from '@/components/Loader';
import CartItem from '@/components/CartItem';

const Cart = () => {
  const { cart, noCart, loading } = useCart()

  if (loading) return <Loader />

  return (
    <Layout title="Your Cart">
      <Container maxWidth="md" sx={{ minHeight: '80vh' }}>
        <Typography component="h1" variant="h1" sx={{ textAlign: 'center' }}>
          Your Cart
        </Typography>
        {noCart || cart.items.length == 0 ?
          <Typography sx={{ pt: 2, textAlign: 'center', fontSize: '1.2rem' }}>There are no items in your cart</Typography>
          :
          <Box sx={{ mt: 5 }}>
            {cart.items.map((item) => (
              <CartItem item={item} key={item.product._id} />))
            }
            <Typography color='secondary'
              sx={{
                fontSize: '1.5rem',
                fontWeight: 500,
                textAlign: 'end',
                '& span': {
                  color: '#0d0c22',
                  fontSize: '1.2rem',
                  fontWeight: 'normal'
                }
              }}><span>Subtotal:</span> ${cart.bill}</Typography>
          </Box>}
      </Container>
    </Layout>
  )
}

export default Protected(Cart)
