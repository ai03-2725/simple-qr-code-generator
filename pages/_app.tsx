import type { AppProps } from 'next/app'
import { ChakraProvider, extendTheme, withDefaultColorScheme } from '@chakra-ui/react'

const customTheme = extendTheme(
  withDefaultColorScheme({
    colorScheme: 'customBlue',
    components: ['Input'],
  }),
  {
    colors: {
      nav: "#4564A1",
      customBlue: {
        50: '#e6f2ff',
        100: '#c6d4ed',
        200: '#a4b7dc',
        300: '#819acb',
        400: '#5e7dba',
        500: '#4564a1',
        600: '#344e7e',
        700: '#24375b',
        800: '#13213a',
        900: '#030b1a',
      }
    },
    fonts: {
      heading: `'Source Sans 3', sans-serif`,
      body: `'Source Sans 3', sans-serif`,
    },
  }
)

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={customTheme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}
