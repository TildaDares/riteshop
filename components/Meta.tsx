import React from 'react'
import Head from 'next/head'
import { NextPage } from 'next'
import { MetaProps } from '@/types/Layout'

const Meta: NextPage<MetaProps> = (props) => {
  let { title, description, image } = props
  description = description ?? "Riteshop | Buy the best"
  const siteTitle = title ? `${title} | Riteshop` : 'Riteshop'
  image = image ?? "https://user-images.githubusercontent.com/106539159/188914648-4af27c80-5c4f-4d99-8964-d7d0016876a2.jpg"

  return (
    <Head>
      <title>{title || title == '' ? `${title} - Riteshop` : 'Riteshop'}</title>
      <meta name="description" content={description} />
      <meta name="twitter:card" content={description} />
      <meta name="twitter:site" content="@B_eautifulChaos" />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
    </Head>
  )
}

export default Meta
