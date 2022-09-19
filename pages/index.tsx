import { Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, CircularProgress, Container, Grid, Typography } from '@mui/material'
import NextLink from 'next/link'
import Image from 'next/image'
import Carousel from 'react-material-ui-carousel';
import useProductsHome from '@/hooks/product/useProductsHome'
import Loader from '@/components/layout/Loader'
import Meta from '@/components/layout/Meta';
import { Product } from '@/types/Product';

const Home = () => {
  const { products, loadMore, isLoadingMore, isLoadingInitialData, isReachingEnd } = useProductsHome();
  const featuredImages = ['/carousel-img1.jpg', '/carousel-img2.jpg', '/carousel-img3.jpg']
  const showLoadMore = !isLoadingMore && !isReachingEnd;

  if (isLoadingInitialData) return <Loader />

  return (
    <>
      <Meta title="Home" />
      {products ?
        <>
          <Carousel animation="slide" sx={{ marginTop: '10px' }}>
            {featuredImages.map((src, index) =>
              <Image
                layout='responsive'
                objectFit='cover'
                width={640}
                height={200}
                key={index}
                src={src}
                alt=' Women Fashion'
                priority
              />
            )}
          </Carousel>
          <Container sx={{ minHeight: '80vh' }}>
            <h1>Products</h1>
            <Grid container spacing={3}>
              {products.map((product: Product) => (
                <Grid item md={4} sm={6} xs={12} key={product._id}>
                  <Card>
                    <NextLink href={`/product/${product._id}`} passHref>
                      <CardActionArea>
                        <CardMedia
                          sx={{ height: '20rem', position: 'relative' }}
                          title={product.name}
                        >
                          <Image src={product.image as string} alt={product.name} layout="fill" objectFit='cover' />
                        </CardMedia>
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

            {isLoadingMore && (
              <CircularProgress />
            )}

            {showLoadMore && (
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', my: 3 }}>
                <Button
                  title="Load More"
                  onClick={() => loadMore()}
                  type="button"
                  variant="outlined"
                >Load More</Button>
              </Box>
            )}

            {isReachingEnd && (
              <Typography sx={{ pt: 2, textAlign: 'center', fontSize: '1rem' }}>There are no more products to display. You have reached the end.</Typography>
            )}
          </Container>
        </> : <Typography sx={{ pt: 2, textAlign: 'center', fontSize: '1.2rem' }}>There are no products to display</Typography>
      }
    </>
  )
}

export default Home
