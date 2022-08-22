import NextLink from 'next/link';
import Image from 'next/image';
import { Button, Card, Grid, Link, List, ListItem, Typography } from '@mui/material';
import React from 'react';
import Layout from '../../components/Layout';
import styles from '../../styles/Home.module.css';

export default function ProductScreen(props: any) {
  const { product } = props.data;
  if (!product) {
    return <div>Product not found</div>
  }
  return (
    <Layout title={product.name} description={product.description}>
      <div className={styles.section}>
        <NextLink href='/' passHref>
          <Link>
            <Typography>
              back to products
            </Typography>
          </Link>
        </NextLink>
      </div>
      <Grid container spacing={1}>
        <Grid item md={6} xs={12}>
          <Image src={product.image} alt={product.name} width={640} height={640} layout="responsive" objectFit='cover'></Image>
        </Grid>
        <Grid item md={3} xs={12}>
          <List>
            <ListItem>
              <Typography component="h1" variant="h1">{product.name}</Typography>
            </ListItem>
            <ListItem>
              <Typography sx={{
                fontSize: '1.2rem',
                color: 'red',
                fontWeight: 500
              }}>${product.price}</Typography>
            </ListItem>
            <ListItem>
              <Typography>{product.description}</Typography>
            </ListItem>
          </List>
        </Grid>
        <Grid item md={3} xs={12}>
          <Card>
            <List>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>Price</Typography>
                  </Grid>
                  <Grid item>
                    <Typography>${product.price}</Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>Status</Typography>
                  </Grid>
                  <Grid item>
                    <Typography>{product.quantity > 0 ? 'In Stock' : 'Unavailable'}</Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Button fullWidth variant="contained" color="primary">
                  Add to cart
                </Button>
              </ListItem>
            </List>
          </Card>
        </Grid>
      </Grid>
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