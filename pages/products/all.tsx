import Loader from '@/components/layout/Loader'
import Meta from '@/components/layout/Meta'
import useProducts from '@/hooks/product/useProducts'
import { getError } from '@/utils/error'
import { Box, Button, Container, Link, Typography } from '@mui/material'
import React from 'react'
import Error from '@/components/Error'
import ProductList from '@/components/products/ProductList'
import AddIcon from '@mui/icons-material/Add';
import NextLink from 'next/link'
import AdminProtected from '@/components/admin/AdminProtected'

const AllProducts = () => {
  const { products, loading, error, count } = useProducts()

  if (loading) return <Loader />

  if (error) {
    return <Error message={getError(error)} />
  }

  return (
    <Container sx={{ minHeight: '80vh' }}>
      <Meta title="All Products" />
      <Typography variant="h1" component="h1" sx={{ textAlign: 'center' }}>
        All Products ({count})
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'end' }}>
        <Button variant="contained" startIcon={<AddIcon />}>
          <NextLink href="/products/new">
            <Link sx={{ color: '#fff' }}>Create new Product</Link>
          </NextLink>
        </Button>
      </Box>

      {!products || products.length == 0 ?
        <Typography sx={{ pt: 2, textAlign: 'center', fontSize: '1.2rem' }}>There are no producrs to display</Typography>
        :
        <ProductList products={products} />
      }
    </Container>
  )
}

export default AdminProtected(AllProducts)
