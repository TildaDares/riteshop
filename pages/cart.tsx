import React from 'react'
import { Button, Box, Container, Link, Typography } from '@mui/material'
import useCart from '@/hooks/cart/useCart'
import Protected from '@/components/auth/Protected';
import Loader from '@/components/layout/Loader';
import CartItem from '@/components/CartItem';
import Meta from '@/components/layout/Meta';
import NextLink from 'next/link'
import { Item } from '@/types/Item';
import { getError } from '@/utils/error';
import Error from '@/components/Error'

const Cart = () => {
  const { cart, loading, error } = useCart();
  const cartItems = cart ? cart.items : [];

  if (loading) return <Loader />

  if (error) {
    <Error message={getError(error)} />
  }

  return (
    <Container maxWidth="md" sx={{ minHeight: '80vh' }}>
      <Meta title="Your Cart" />
      <Typography component="h1" variant="h1" sx={{ textAlign: 'center' }}>
        Your Cart
      </Typography>
      {cartItems.length == 0 ?
        <Typography sx={{ pt: 2, textAlign: 'center', fontSize: '1.2rem' }}>There are no items in your cart</Typography>
        :
        <>
          <Box sx={{ mt: 5 }}>
            {cartItems.map((item: Item) => (
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
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'end', mt: 3 }}>
            <Button variant="contained">
              <NextLink href="/checkout" passHref>
                <Link sx={{ color: '#fff' }}>Proceed to Checkout</Link>
              </NextLink>
            </Button>
          </Box>
        </>}
    </Container>
  )
}

export default Protected(Cart)
