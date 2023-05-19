import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider, ColorModeScript, extendTheme, type ThemeConfig } from '@chakra-ui/react'


const configChakra: ThemeConfig = {
  useSystemColorMode: false,
  initialColorMode: "dark",
};

const theme = extendTheme(configChakra);

function MyApp({ Component, pageProps }: AppProps) {
  return <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <Component {...pageProps} />
    </ChakraProvider>
}

export default MyApp
