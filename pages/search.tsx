import { Box, Card, CardActionArea, CardActions, InputLabel, MenuItem, CardContent, CardMedia, Container, Grid, Typography, FormControl } from '@mui/material'
import Select, { SelectChangeEvent } from '@mui/material/Select';
import NextLink from 'next/link'
import Loader from '@/components/layout/Loader'
import Meta from '@/components/layout/Meta';
import { Product } from '@/types/Product';
import useSearch from '@/hooks/search/useSearch';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import SearchBar from '@/components/SearchBar';

const Search = () => {
  const { query, pathname, push } = useRouter();
  const [price, setPrice] = useState('');
  const keyword = query.keyword as string
  const sort = query.sort as string
  const { products, loading } = useSearch({ keyword, sort });

  const handleChange = (event: SelectChangeEvent) => {
    push({ pathname, query: { ...query, sort: event.target.value } });
    setPrice(event.target.value);
  };

  if (loading) return <Loader />

  return (
    <>
      <Meta title="Search" />
      <Container sx={{ minHeight: '80vh' }}>
        <Box sx={{ display: { xs: 'block', sm: 'none' } }} >
          <SearchBar />
        </Box>
        <h1>Search results:</h1>
        {!products || !products.length ?
          <Typography sx={{ pt: 2, textAlign: 'center', fontSize: '1.2rem' }}>No products matched your search term</Typography>
          :
          <>
            <FormControl sx={{ m: 1, minWidth: 80 }}>
              <InputLabel id="price-select-label">Price</InputLabel>
              <Select
                labelId="price-select-label"
                id="price-select"
                value={price}
                onChange={handleChange}
                autoWidth
                label="Price"
              >
                <MenuItem value={'price'}>Low to High</MenuItem>
                <MenuItem value={'-price'}>High to Low</MenuItem>
              </Select>
            </FormControl>
            <Grid container spacing={3}>
              {products.map((product: Product) => (
                <Grid item md={4} sm={6} xs={12} key={product._id}>
                  <Card>
                    <NextLink href={`/product/${product._id}`} passHref>
                      <CardActionArea>
                        <CardMedia
                          sx={{ height: '20rem' }}
                          component="img"
                          image={product.image}
                          title={product.name}
                        />
                        <CardContent sx={{ paddingBottom: 0 }}>
                          <Typography>
                            {product.name}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </NextLink>
                    <CardActions>
                      <Typography
                        color='secondary'
                        sx={{
                          fontSize: '1.2rem',
                          pl: 1,
                          fontWeight: 500
                        }}
                      >
                        ${product.price}
                      </Typography>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </>
        }
      </Container>
    </>
  )
}

export default Search
