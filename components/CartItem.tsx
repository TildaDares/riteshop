import React, { useState } from 'react'
import { Box, Button, Card, Typography, CardContent, CardMedia, Input } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useSnackbar } from 'notistack';
import { getError } from '@/utils/error';
import useUpdateQuantity from '@/hooks/cart/useUpdateQuantity';
import { deleteData } from '@/utils/fetchData';
import { mutate } from 'swr';
import { Item } from '@/types/Item';

const CartItem = ({ item }: { item: Item }) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [quantity, setQuantity] = useState(item.quantity)
  const updateQuantity = useUpdateQuantity()

  function handleInputChange(e) {
    closeSnackbar();
    const value = e.target.value
    if (value > item.product.quantity) {
      enqueueSnackbar('You have exceeded the maximum available quantity', { variant: 'warning' });
      setQuantity(1)
    } else if (value < 1) {
      setQuantity(1)
    } else {
      handleQuantityChange(value)
    }
  }

  function handleAddButton() {
    closeSnackbar();
    if (quantity >= item.product.quantity) {
      enqueueSnackbar('You have exceeded the maximum available quantity', { variant: 'warning' });
      return;
    }
    const newQuantity = quantity + 1
    handleQuantityChange(newQuantity)
  }

  function handleSubtractButton() {
    closeSnackbar();
    if (quantity > 1) {
      const newQuantity = quantity - 1
      handleQuantityChange(newQuantity)
    }
  }

  async function handleQuantityChange(qty: number) {
    closeSnackbar();
    try {
      await updateQuantity(item.product._id, Number(qty))
      setQuantity(Number(qty))
    } catch (err) {
      enqueueSnackbar(getError(err), { variant: 'error' });
    }
  }

  async function removeFromCart() {
    try {
      await deleteData('cart', { productId: item.product._id })
      mutate('cart')
    } catch (err) {
      enqueueSnackbar(getError(err), { variant: 'error' });
    }
  }

  return (
    <Card sx={{ mb: 3, position: 'relative' }}>
      <Box sx={{ display: 'flex', maxHeight: '170px', width: '100%' }}>
        <CardMedia
          component="img"
          sx={{ width: { xs: 110, sm: 151 }, maxHeight: { sm: 151 } }}
          image={item.product.image}
          alt={item.product.name}
        />
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <CardContent sx={{ flex: '1 0 auto' }}>
            <Typography component="div" variant="h5">
              {item.product.name}
            </Typography>
            <Typography
              color='secondary'
              sx={{
                fontSize: '1.2rem',
                fontWeight: 500,
                '& span': {
                  color: '#8c8585',
                  fontSize: '1rem',
                  fontWeight: 'normal'
                }
              }}
            >
              ${item.product.price * item.quantity} <span>(Item Price: ${item.product.price})</span>
            </Typography>
          </CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', pl: 2, pb: 1 }}>
            <IconButton
              aria-label="subtract quantity"
              component="label"
              color="primary"
              onClick={handleSubtractButton}
              sx={{ backgroundColor: '#e5e2e2' }}
            >
              <RemoveIcon />
            </IconButton>
            <Input
              value={quantity}
              type='number'
              onChange={handleInputChange}
              inputProps={{ min: '1', max: item.product.quantity }}
              sx={{
                ml: 1,
                mr: 1,
                '& input': {
                  textAlign: 'center'
                }
              }}
            />
            <IconButton
              aria-label="add quantity"
              component="label"
              color='primary'
              onClick={handleAddButton}
              sx={{ backgroundColor: '#e5e2e2' }}
            >
              <AddIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>
      <Button
        color="secondary"
        sx={{
          position: { xs: 'none', sm: 'absolute' },
          width: { xs: '100%', sm: 'auto' },
          mt: { xs: 2, sm: 0 },
          display: { xs: 'flex', sm: 'block' },
          justifyContent: 'end',
          bottom: 0,
          right: 0
        }}
        onClick={removeFromCart}
      >
        Remove
      </Button>
    </Card>
  )
}

export default CartItem
