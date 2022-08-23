import React, { useContext } from 'react'
import Head from 'next/head'
import NextLink from 'next/link'
import { AppBar, Box, Button, Link, Stack, Toolbar, Typography } from '@mui/material'
import useScrollTrigger from '@mui/material/useScrollTrigger';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import styles from '../styles/Home.module.css'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchBar from '../components/SearchBar'

function ElevationScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

export default function Layout(props) {
  const { title, description, children } = props
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
        main: '#0d0c22'
        // main: '#FFB200'
      },
      secondary: {
        main: '#FFA45B'
      },
    }
  })

  return (
    <div>
      <Head>
        <title>{title || title == '' ? `${title} - Riteshop` : 'Riteshop'}</title>
        {description && <meta name="description" content={description} />}
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ display: 'flex' }}>
          <ElevationScroll {...props}>
            <AppBar
              sx={{
                mb: 2,
                backgroundColor: '#fff',
                pl: 4,
                pr: 4
              }}
            >
              <Toolbar>
                <NextLink href='/' passHref>
                  <Link sx={{
                    flexGrow: 1,
                  }}
                    underline="none"
                  >
                    <Typography
                      sx={{
                        fontSize: '1.5rem',
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                      }}
                    >
                      Riteshop
                    </Typography>
                  </Link>
                </NextLink>
                <Stack direction="row" spacing={1}>
                  <SearchBar />
                  <Button size="large" startIcon={<ShoppingCartIcon />}>
                    <NextLink href='/cart' passHref>
                      <Link underline="none">Cart</Link>
                    </NextLink>
                  </Button>
                  <Button size="large">
                    <NextLink href='/login' passHref>
                      <Link underline="none">Login</Link>
                    </NextLink>
                  </Button>
                </Stack>
              </Toolbar>
            </AppBar>
          </ElevationScroll>
          <Toolbar />
        </Box>

        <main>
          {children}
        </main>

        <footer className={styles.footer}>
          <Typography>
            All rights reserved. Riteshop &copy; {new Date().getFullYear()}
          </Typography>
        </footer>
      </ThemeProvider>
    </div>
  )
}
