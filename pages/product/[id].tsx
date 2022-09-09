import NextLink from 'next/link';
import {
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  IconButton,
  Input,
  Link,
  List,
  ListItem,
  Stack,
  Typography
} from '@mui/material';
import Error from 'next/error'
import React, { useState } from 'react';
import Meta from '@/components/Meta';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useSnackbar } from 'notistack';
import { getError } from '@/utils/error';
import { getData, postData } from '@/utils/fetchData'
import { useRouter } from 'next/router';
import useUser from '@/hooks/user/useUser';
import { mutate } from 'swr';

export default function ProductScreen(props: any) {
  const product = props?.data?.product
  const router = useRouter();
  const { user } = useUser();
  const [quantity, setQuantity] = useState(1)
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  async function addToCart() {
    closeSnackbar();
    try {
      if (!user) {
        enqueueSnackbar('Please log in first', { variant: 'error' });
        return router.push(`/login?redirect=product/${product._id}`);
      }
      const body = {
        item: {
          product: product._id,
          quantity
        }
      }
      await postData('cart', body)
      mutate('cart')
      enqueueSnackbar('Product added to cart successfully', { variant: 'success' });
    } catch (err) {
      enqueueSnackbar(getError(err), { variant: 'error' });
    }
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    closeSnackbar();
    const value = Number(e.target.value)
    if (value > product.quantity) {
      enqueueSnackbar('You have exceeded the maximum available quantity', { variant: 'warning' });
      setQuantity(1)
    } else if (value < 1) {
      setQuantity(1)
    } else {
      setQuantity(value)
    }
  }

  function handleAddButton() {
    closeSnackbar();
    if (quantity >= product.quantity) {
      enqueueSnackbar('You have exceeded the maximum available quantity', { variant: 'warning' });
      return;
    }
    setQuantity((qty) => Number(qty) + 1);
  }

  function handleSubtractButton() {
    closeSnackbar();
    if (quantity > 1) {
      setQuantity((qty) => Number(qty) - 1);
    }
  }

  if (props.errorCode) {
    return <Error statusCode={props.errorCode} />
  }

  return (
    <Container sx={{ minHeight: '80vh' }}>
      <Meta title={product?.name} description={product?.description} image={product?.image} />
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
              <Typography key="3" color="secondary">
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
              <CardContent sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                flex: '1 0 auto', pl: 0
              }}
              >
                <Grid container sx={{ display: 'flex', justifyContent: 'space-between' }}>
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
                  <Grid item xs={3} sx={{ textAlign: 'end' }}>
                    <Typography
                      color='secondary'
                      sx={{
                        fontSize: '1.9rem',
                        fontWeight: 500
                      }}>
                      ${product.price}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container spacing={2} sx={{ marginLeft: '1px', flexDirection: { xs: 'column', md: 'row' } }}>
                  <Grid item sx={{ pl: 0 }}>
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
                      inputProps={{ min: '1', max: product.quantity }}
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
                  </Grid>
                  <Grid item>
                    <Button
                      fullWidth
                      variant="contained"
                      color="secondary"
                      size="large"
                      onClick={addToCart}
                      startIcon={<AddShoppingCartIcon />}
                      sx={{ ml: { xs: 0, md: 2 }, p: 1, borderRadius: '20px' }}
                    >
                      Add to cart
                    </Button>
                  </Grid>
                </Grid>
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
  )
}

export async function getServerSideProps(context: any) {
  let data = null, errorCode: boolean | number = false;
  try {
    const { id } = context.params;
    data = await getData(`products/${id}`);
    // Pass data to the page via props
  } catch (error) {
    errorCode = 404
  } finally {
    return { props: { errorCode, data } }
  }
}