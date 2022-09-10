import { Card, CardActionArea, CardActions, CardContent, CardMedia, Container, Grid, Typography } from '@mui/material'
import NextLink from 'next/link'
import Image from 'next/image'
import Carousel from 'react-material-ui-carousel';
import useProducts from '@/hooks/product/useProducts'
import Loader from '@/components/Loader'
import Meta from '@/components/Meta';
import { Product } from '@/types/Product';

const Home = () => {
  const { products, loading } = useProducts();
  const featuredImages = ['/carousel-img1.jpg', '/carousel-img2.jpg', '/carousel-img3.jpg']

  if (loading) return <Loader />

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
          </Container>
        </> : <Typography sx={{ pt: 2, textAlign: 'center', fontSize: '1.2rem' }}>There are no products to display</Typography>
      }
    </>
  )
}

export default Home
