import Head from 'next/head'
import { Navbar } from '@/components/navbar'
import { QRGenerator } from '@/components/qr-gen'
import { Flex, Spacer } from '@chakra-ui/react'
import { Footer } from '@/components/footer'

const title = "Simple QR Code Generator"
const desc = "Just a simple QR code generator. No ads, accounts, or paywalls."
const ogImage = "https://qr.ai03.com/qr-code-gen.jpg"
const ogAlt = "Simple QR Code Generator"

export default function Home() {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={desc} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />

        <meta property="og:title" content={title} />
        <meta property="og:site_name" content="qr.ai03.com" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:alt" content={ogAlt} />
        <meta property="og:url" content="https://qr.ai03.com/" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:image" content={ogImage} />
        <meta name="twitter:image:alt" content={ogAlt} />
        <meta name="twitter:description" content={desc} />
        <meta name="twitter:creator" content="@ai03_2725" />

        <meta property="image" content={ogImage} />
        
        <link rel="sitemap" href="/sitemap.xml" />
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
