import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider, ColorModeScript, extendTheme, useColorMode, type ThemeConfig } from '@chakra-ui/react'
import { useEffect } from 'react';

localStorage.setItem('chakra-ui-color-mode', 'dark');


function MyApp({ Component, pageProps }: AppProps) {
  return <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
}

export default MyApp
