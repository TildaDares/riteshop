import { Card, CardActionArea, CardActions, CardContent, CardMedia, Container, Grid, Typography } from '@mui/material'
import NextLink from 'next/link'
import type { NextPage } from 'next'
import Image from 'next/image'
import Layout from '../components/Layout'
import Carousel from 'react-material-ui-carousel';

const Home: NextPage = (props) => {
  const { data } = props
  const featuredImages = ['/carousel-img1.jpg', '/carousel-img2.jpg', '/carousel-img3.jpg']
  return (
    <Layout>
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
          {data.products.map(product => (
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
    </Layout>
  )
}

export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`${process.env.DB_HOST}/api/products`)
  const data = await res.json()

  // Pass data to the page via props
  return { props: { data } }
}

export default Home
