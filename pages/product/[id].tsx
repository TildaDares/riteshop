import NextLink from 'next/link';
import {
  Box,
  Breadcrumbs,
  Button,
  ButtonGroup,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  IconButton,
  Link,
  List,
  ListItem,
  Stack,
  Typography
} from '@mui/material';
import React from 'react';
import Layout from '../../components/Layout';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

export default function ProductScreen(props: any) {
  const { product } = props.data;
  return (
    <Layout title={product ? product.name : ''} description={product ? product.description : ''}>
      <Container sx={{ minHeight: '80vh' }}>
        {
          product &&
          (<>
            <Stack spacing={2} sx={{ mt: 1 }}>
              <Breadcrumbs separator="›" aria-label="breadcrumb">
                <NextLink href='/' passHref>
                  <Link underline="hover" key="1" color="inherit">
                    Products
                  </Link>
                </NextLink>
                <Typography key="3" color="text.primary">
                  {product.name}
                </Typography>
              </Breadcrumbs>
            </Stack>
            <Card sx={{
              display: 'flex',
              mt: 2,
              flexDirection: { xs: 'column', md: 'row' },
              maxHeight: { md: '640px' }
            }}>
              <CardMedia
                component="img"
                sx={{
                  width: { xs: '100%', md: '50%' },
                  m: { md: '20px 0 20px 20px' },
                  objectFit: 'cover'
                }}
                image={product.image}
                alt={product.name}
              />
              <Box sx={{
                display: 'flex',
                flexDirection: { xs: 'row', md: 'column' },
                width: { xs: '100%', md: '50%' }
              }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                  <Grid container spacing={7}>
                    <Grid item xs={9}>
                      <List sx={{ pt: 0 }}>
                        <ListItem sx={{ pt: 0 }}>
                          <Grid item>
                            <Typography
                              component="h1"
                              variant="h1"
                              sx={{
                                m: 0,
                                fontSize: '2.5rem'
                              }}
                            >
                              {product.name}
                            </Typography>
                          </Grid>
                        </ListItem>
                        <ListItem>
                          <Typography>{product.description}</Typography>
                        </ListItem>
                        <ListItem>
                          <Typography sx={{ color: 'red', fontWeight: 500, fontSize: '1.2rem' }}>
                            {product.quantity > 0 ? 'In Stock' : 'Unavailable'}
                          </Typography>
                        </ListItem>
                      </List>
                    </Grid>
                    <Grid item xs={3}>
                      <Typography sx={{
                        fontSize: '1.9rem',
                        color: 'red',
                        fontWeight: 500
                      }}>${product.price}</Typography>
                    </Grid>
                  </Grid>
                  {/* <ButtonGroup>
                    <IconButton color="primary" aria-label="add quantity" component="label" variant="contained">
                      <AddIcon />
                    </IconButton>
                    <Typography>1</Typography>
                    <IconButton color="primary" aria-label="subtract quantity" component="label" variant="contained">
                      <RemoveIcon />
                    </IconButton>
                  </ButtonGroup> */}
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    startIcon={<AddShoppingCartIcon />}
                    sx={{ ml: 2, p: 1 }}
                  >
                    Add to cart
                  </Button>
                </CardContent>
              </Box>
            </Card>
          </>)
        }
        {!product &&
          <Container sx={{ textAlign: 'center', display: 'flex', alignItems: 'center', minHeight: '80vh' }}>
            <SentimentVeryDissatisfiedIcon fontSize="large" />
            <Typography variant="h1" sx={{ ml: 2 }}> Product Not Found</Typography>
          </Container>
        }
      </Container>
    </Layout>
  )
}

export async function getServerSideProps(context: any) {
  // Fetch data from external API
  const { id } = context.params;
  const res = await fetch(`${process.env.DB_HOST}/api/products/${id}`);
  const data = await res.json()

  // Pass data to the page via props
  return { props: { data } }
}