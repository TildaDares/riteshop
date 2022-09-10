import React from 'react'
import Head from 'next/head'
import { NextPage } from 'next'
import { Typography } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import styles from '@/styles/Home.module.css'
import { LayoutProps } from '@/types/Layout'
import NavBar from '@/components/NavBar'

const Layout: NextPage<LayoutProps> = (props) => {
  const { children } = props
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
      },
      secondary: {
        main: '#d32f2f',
      }
    }
  })

  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ThemeProvider theme={theme}>
        <CssBaseline />
        <NavBar />

        <main className={styles.main}>
          {children}
        </main>

        <footer className={styles.footer}>
          <Typography>
            All rights reserved. Riteshop &copy; {new Date().getFullYear()}
          </Typography>
        </footer>
      </ThemeProvider>
    </div >
  )
}

export default Layout
