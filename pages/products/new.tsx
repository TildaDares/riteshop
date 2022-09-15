import React, { useState } from 'react'
import AdminProtected from '@/components/admin/AdminProtected';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { getError } from '@/utils/error';
import { Product } from '@/types/Product';
import { postData } from '@/utils/fetchData';
import { Backdrop, CircularProgress } from '@mui/material';
import CreateProduct from '@/components/products/CreateProduct';

const NewProduct = () => {
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar();
  const [isSubmitting, setSubmitting] = useState(false)

  async function submitHandler(body: Product) {
    setSubmitting(true)
    try {
      const product = await postData('products', body)
      enqueueSnackbar('Product successfully created', { variant: 'success' })
      router.push('/products/all')
    } catch (error) {
      setSubmitting(false)
      enqueueSnackbar(getError(error), { variant: 'error' })
    }
  }

  if (isSubmitting) {
    return (
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isSubmitting}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    )
  }

  return (
    <CreateProduct title="Create Product" submitHandler={submitHandler} />
  )
}

export default AdminProtected(NewProduct)
