import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider, ColorModeScript, extendTheme, useColorMode, type ThemeConfig } from '@chakra-ui/react'
import { useEffect } from 'react';

// localStorage.setItem('chakra-ui-color-mode', 'dark');
// 2. Add your color mode config
const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}

// 3. extend the theme
const theme = extendTheme({ config })


function MyApp({ Component, pageProps }: AppProps) {
  return <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
}

export default MyApp
