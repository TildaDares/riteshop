import React from 'react'
import Head from 'next/head'
import { AppBar, Container, Toolbar, Typography } from '@material-ui/core'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Head>
        <title>Riteshop</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AppBar position='static'>
        <Toolbar>
          <Typography>Riteshop</Typography>
        </Toolbar>
      </AppBar>

      <Container>
        {children}
      </Container>

      <footer>
        <Typography>
          All rights reserved. Riteshop &copy; {new Date().getFullYear()}
        </Typography>
      </footer>
    </div>
  )
}
