import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider, ColorModeScript, extendTheme, useColorMode, type ThemeConfig } from '@chakra-ui/react'
import { useEffect } from 'react';


const configChakra: ThemeConfig = {
  useSystemColorMode: false,
  initialColorMode: "dark",
};

const { colorMode, toggleColorMode } = useColorMode();

useEffect(() => {
  if (colorMode === "light") {
    toggleColorMode();
  }
}, []);

const theme = extendTheme(configChakra);

function MyApp({ Component, pageProps }: AppProps) {
  return <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <Component {...pageProps} />
    </ChakraProvider>
}

export default MyApp
