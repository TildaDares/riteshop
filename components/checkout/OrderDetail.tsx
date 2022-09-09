import React from 'react';
import NextLink from 'next/link';
import Image from 'next/image';
import {
  Grid,
  TableContainer,
  Table,
  Typography,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Link,
  Card,
  List,
  ListItem,
} from '@mui/material';
import { OrderProps } from '@/types/Order';
import { Item } from '@/types/Item';

const OrderDetail = (props: OrderProps) => {
  const { items, itemsPrice, shippingFee, totalPrice, shippingAddress, isDelivered, isPaid, deliveredAt, children } = props

  return (
    <Grid container spacing={1}>
      <Grid item md={9} xs={12}>
        <Card sx={{ mb: 2 }}>
          <List>
            <ListItem>
              <Typography component="h2" variant="h2">
                Shipping Address
              </Typography>
            </ListItem>
            <ListItem>
              {shippingAddress.address},{' '}
              {shippingAddress.city}, {shippingAddress.postalCode},{' '}
              {shippingAddress.country}
            </ListItem>
            <ListItem>
              <Typography sx={{ fontWeight: 500 }}>Status:{' '}
                {isDelivered
                  ? `delivered at ${deliveredAt}`
                  : 'not delivered'}
              </Typography>
            </ListItem>
          </List>
        </Card>
        <Card sx={{ mb: 2 }}>
          <List>
            <ListItem>
              <Typography component="h2" variant="h2">
                Payment Method
              </Typography>
            </ListItem>
            <ListItem>Paypal</ListItem>
            <ListItem>
              <Typography sx={{ fontWeight: 500 }}>Status: {isPaid ? `paid` : 'not paid'}</Typography>
            </ListItem>
          </List>
        </Card>
        <Card>
          <List>
            <ListItem>
              <Typography component="h2" variant="h2">
                Order Items
              </Typography>
            </ListItem>
            <ListItem>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Image</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell align="right">Quantity</TableCell>
                      <TableCell align="right">Price</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {items.map((item: Item) => (
                      <TableRow key={item._id}>
                        <TableCell>
                          <NextLink href={`/product/${item.product._id}`} passHref>
                            <Link>
                              <Image
                                src={item.product.image}
                                alt={item.product.name}
                                width={50}
                                height={50}
                              ></Image>
                            </Link>
                          </NextLink>
                        </TableCell>

                        <TableCell>
                          <NextLink href={`/product/${item.product._id}`} passHref>
                            <Link>
                              <Typography>{item.product.name}</Typography>
                            </Link>
                          </NextLink>
                        </TableCell>
                        <TableCell align="right">
                          <Typography>{item.quantity}</Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Typography color="secondary">${item.product.price}</Typography>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </ListItem>
          </List>
        </Card>
      </Grid>
      <Grid item md={3} xs={12}>
        <Card>
          <List>
            <ListItem>
              <Typography variant="h2">Order Summary</Typography>
            </ListItem>
            <ListItem>
              <Grid container>
                <Grid item xs={6}>
                  <Typography>Items:</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography align="right">${itemsPrice}</Typography>
                </Grid>
              </Grid>
            </ListItem>
            <ListItem>
              <Grid container>
                <Grid item xs={6}>
                  <Typography>Shipping:</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography align="right">${shippingFee}</Typography>
                </Grid>
              </Grid>
            </ListItem>
            <ListItem>
              <Grid container>
                <Grid item xs={6}>
                  <Typography color="secondary" sx={{ fontWeight: 700 }}>
                    Total:
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography color="secondary" sx={{ fontWeight: 700 }} align="right">
                    ${totalPrice}
                  </Typography>
                </Grid>
              </Grid>
            </ListItem>
            {children}
          </List>
        </Card>
      </Grid>
    </Grid>
  );
}

export default OrderDetail
