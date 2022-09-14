import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SnackbarProvider } from 'notistack';
import { SWRConfig } from 'swr';
import Layout from '@/components/layout/Layout';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig value={{ revalidateOnFocus: false, shouldRetryOnError: false, dedupingInterval: 0 }}>
      <PayPalScriptProvider options={{ "client-id": `${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}` }}>
        <SnackbarProvider anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </SnackbarProvider>
      </PayPalScriptProvider>
    </SWRConfig >
  )
}

export default MyApp
