import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';
import React from 'react';

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return initialProps;
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <link rel='manifest' href='/manifest.json' />
          <meta name="theme-color" content="#0d0c22" />
          <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
