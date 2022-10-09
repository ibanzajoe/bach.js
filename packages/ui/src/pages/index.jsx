import Head from 'next/head'

import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { Pricing } from '@/components/Pricing'

export default function Home() {
  return (
    <>
      <Head>
        <title>Bach.js - Coding is a symphony</title>
        <meta
          name="description"
          content="By leveraging insights from our network of industry insiders, you’ll know exactly when to buy to maximize profit, and exactly when to sell to avoid painful losses."
        />
      </Head>
      <Header />
      <main>
        <Hero />
        <Pricing />
      </main>
      <Footer />
    </>
  )
}
