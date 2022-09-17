import React, { useState } from 'react'
import AdminProtected from '@/components/admin/AdminProtected';
import { useRouter } from 'next/router';
import useProductById from '@/hooks/product/useProductById';
import { useSnackbar } from 'notistack';
import Error from '@/components/Error'
import Loader from '@/components/layout/Loader';
import { getError } from '@/utils/error';
import CreateProduct from '@/components/products/CreateProduct';
import { Product } from '@/types/Product';
import { putData } from '@/utils/fetchData';
import { Backdrop, CircularProgress } from '@mui/material';
import { uploadImage } from '@/utils/uploadImage';

const EditProduct = () => {
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar();
  const id = router.query['id'] as string
  const { product, loading, error } = useProductById(id)
  const [isSubmitting, setSubmitting] = useState(false)

  async function submitHandler(body: Product) {
    setSubmitting(true)
    try {
      if (body.image) {
        body.image = await uploadImage(body.image as Blob) as string
      }
      await putData(`products/${id}`, body)
      enqueueSnackbar('Product successfully updated', { variant: 'success' })
      router.push(`/product/${id}`)
      setSubmitting(false)
    } catch (error) {
      setSubmitting(false)
      enqueueSnackbar(getError(error), { variant: 'error' })
    }
  }

  if (error) {
    return <Error message={getError(error)} />
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

  if (loading) return <Loader />

  return (
    <CreateProduct title="Edit Product" product={product} submitHandler={submitHandler} />
  )
}

export default AdminProtected(EditProduct)
