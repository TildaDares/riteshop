import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import { SnackbarProvider } from 'notistack';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, [])
  return (
    <SnackbarProvider anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
      <Component {...pageProps} />
    </SnackbarProvider>
  )
}

export default MyApp
