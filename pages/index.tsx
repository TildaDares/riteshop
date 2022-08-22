import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material'
import NextLink from 'next/link'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Layout from '../components/Layout'
import styles from '../styles/Home.module.css'

const Home: NextPage = (props) => {
  const { data } = props
  return (
    <Layout>
      <div>
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
                    sx={{
                      fontSize: '1.2rem',
                      paddingLeft: '8px',
                      color: 'red',
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
      </div>
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
