import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, Typography } from '@material-ui/core'
import NextLink from 'next/link'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Layout from '../components/Layout'
import styles from '../styles/Home.module.css'
import useStyles from '../utils/styles'

const Home: NextPage = (props) => {
  const { data } = props
  const classes = useStyles();
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
                      className={classes.media}
                      component="img"
                      image={product.image}
                      title={product.name}
                    />
                    <CardContent>
                      <Typography>
                        {product.name}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </NextLink>
                <CardActions>
                  <Typography>
                    ${product.price}
                  </Typography>
                  <Button size="small" color="primary">
                    Add to cart
                  </Button>
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
