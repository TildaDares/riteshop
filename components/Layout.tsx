import React from 'react'
import Head from 'next/head'
import { AppBar, Container, Toolbar, Typography } from '@material-ui/core'
import useStyles from '../utils/styles'

export default function Layout({ children }: { children: React.ReactNode }) {
  const classes = useStyles();
  return (
    <div>
      <Head>
        <title>Riteshop</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AppBar position='static' className={classes.navbar}>
        <Toolbar>
          <Typography>Riteshop</Typography>
        </Toolbar>
      </AppBar>

      <Container className={classes.main}>
        {children}
      </Container>

      <footer className={classes.footer}>
        <Typography>
          All rights reserved. Riteshop &copy; {new Date().getFullYear()}
        </Typography>
      </footer>
    </div>
  )
}
