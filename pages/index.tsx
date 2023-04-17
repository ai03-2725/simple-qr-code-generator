import Head from 'next/head'
import { Navbar } from '@/components/navbar'
import { QRGenerator } from '@/components/qr-gen'
import { Flex, Spacer } from '@chakra-ui/react'
import { Footer } from '@/components/footer'

export default function Home() {
  return (
    <>
      <Head>
        <title>Simple QR Code Generator</title>
        <meta name="description" content="Just a simple QR code generator. No ads, accounts, or paywalls." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex direction="column" as="main" minH="100vh">
        <Navbar />
        <QRGenerator />
        <Spacer />
        <Footer />
      </Flex>
    </>
  )
}
