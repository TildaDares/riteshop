import React, { useState } from 'react'
import AdminProtected from '@/components/admin/AdminProtected';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { getError } from '@/utils/error';
import { Product } from '@/types/Product';
import { Backdrop, CircularProgress } from '@mui/material';
import CreateProduct from '@/components/products/CreateProduct';
import { uploadImage } from '@/utils/uploadImage';
import axiosInstance from '@/utils/axiosConfig'

const NewProduct = () => {
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar();
  const [isSubmitting, setSubmitting] = useState(false)

  async function submitHandler(body: Product) {
    setSubmitting(true)
    try {
      if (body.image) {
        body.image = await uploadImage(body.image as Blob) as string
      }
      await axiosInstance.post('products', body)
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
