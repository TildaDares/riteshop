import React, { useEffect } from 'react'
import Head from 'next/head'
import { NextPage } from 'next'
import { Typography } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import styles from '@/styles/Home.module.css'
import { LayoutProps } from '@/types/Layout'
import NavBar from '@/components/layout/NavBar'
import { useRouter } from 'next/router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css'
import MobileBottomNavigation from '@/components/layout/BottomNavigation';

const Layout: NextPage<LayoutProps> = (props) => {
  const router = useRouter()

  useEffect(() => {
    const handleStart = () => {
      NProgress.start()
    }

    const handleStop = () => {
      NProgress.done()
    }

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleStop)
    router.events.on('routeChangeError', handleStop)

    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleStop)
      router.events.off('routeChangeError', handleStop)
    }
  }, [router])
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
        <link rel="shortcut icon" href="/icons/favicon.ico" />
      </Head>

      <ThemeProvider theme={theme}>
        <CssBaseline />
        <NavBar />

        <main className={styles.main}>
          {children}
        </main>

        <MobileBottomNavigation />
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
