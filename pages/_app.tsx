import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import { SnackbarProvider } from 'notistack';
import { SWRConfig } from 'swr';
import Layout from '@/components/Layout';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, [])
  return (
    <SWRConfig value={{ revalidateOnFocus: false, shouldRetryOnError: false, dedupingInterval: 0 }}>
      <SnackbarProvider anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SnackbarProvider>
    </SWRConfig >
  )
}

export default MyApp
