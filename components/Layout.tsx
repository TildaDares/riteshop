import React, { useContext } from 'react'
import Cookies from 'js-cookie'
import Head from 'next/head'
import NextLink from 'next/link'
import { AppBar, Container, createTheme, CssBaseline, Link, Switch, ThemeProvider, Toolbar, Typography } from '@material-ui/core'
import useStyles from '../utils/styles'
import { Store } from '../utils/Store'

export default function Layout({ title, description, children }: { title: string, description: string, children: React.ReactNode }) {
  const { state, dispatch } = useContext(Store)
  const { darkMode } = state
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
      type: darkMode ? 'dark' : 'light',
      primary: {
        main: '#FFB200'
      },
      secondary: {
        main: '#FFA45B'
      }
    }
  })
  const classes = useStyles();
  const darkModeChangeHandler = () => {
    dispatch({ type: darkMode ? 'DARK_MODE_OFF' : 'DARK_MODE_ON' })
    const newDarkMode = !darkMode
    Cookies.set('darkMode', newDarkMode ? 'ON' : 'OFF');
  }
  return (
    <div>
      <Head>
        <title>{title ? `${title} - Riteshop` : 'Riteshop'}</title>
        {description && <meta name="description" content={description} />}
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position='static' className={classes.navbar}>
          <Toolbar>
            <NextLink href='/' passHref>
              <Link>
                <Typography className={classes.brand}>Riteshop</Typography>
              </Link>
            </NextLink>
            <div className={classes.grow}></div>
            <div>
              <Switch checked={darkMode} onChange={darkModeChangeHandler}></Switch>
              <NextLink href='/cart' passHref>
                <Link>Cart</Link>
              </NextLink>
              <NextLink href='/login' passHref>
                <Link>Login</Link>
              </NextLink>
            </div>
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
      </ThemeProvider>
    </div>
  )
}
