import React, { useContext } from 'react'
import Cookies from 'js-cookie'
import Head from 'next/head'
import NextLink from 'next/link'
import { AppBar, Container, Link, Toolbar, Typography, IconButton } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import styles from '../styles/Home.module.css'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

export default function Layout({ title, description, children }: { title: string, description: string, children: React.ReactNode }) {
  const theme = createTheme({
    typography: {
      h1: {
        fontSize: '1.6rem',
        fontWeight: 400,
        margin: '1rem 0'
      },
      h2: {
        fontSize: '1.4rem',
        fontWeight: 400,
        margin: '1rem 0'
      }
    },
    palette: {
      mode: 'light',
      primary: {
        main: '#FFB200'
      },
      secondary: {
        main: '#FFA45B'
      }
    }
  })
  return (
    <div>
      <Head>
        <title>{title ? `${title} - Riteshop` : 'Riteshop'}</title>
        {description && <meta name="description" content={description} />}
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar
          position='sticky'
          sx={{
            '& a': {
              color: '#ffffff',
              marginLeft: 10,
            }
          }}
          color="primary">
          <Toolbar>
            <NextLink href='/' passHref>
              <Link>
                <Typography
                  sx={{
                    fontWeight: 'bold',
                    fontSize: '1.5rem',
                  }}
                >
                  Riteshop
                </Typography>
              </Link>
            </NextLink>
            <div className={styles.grow}></div>
            <div className={styles.navbarItems}>
              <NextLink href='/cart' passHref>
                <Link><ShoppingCartIcon fontSize="large" /></Link>
              </NextLink>
              <NextLink href='/login' passHref>
                <Link sx={{ marginLeft: 40, fontSize: "1.2rem" }}>Login</Link>
              </NextLink>
            </div>
          </Toolbar>
        </AppBar>

        <Container sx={{ minHeight: '80vh' }}>
          {children}
        </Container>

        <footer className={styles.footer}>
          <Typography>
            All rights reserved. Riteshop &copy; {new Date().getFullYear()}
          </Typography>
        </footer>
      </ThemeProvider>
    </div>
  )
}
