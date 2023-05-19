import type { NextPage } from 'next'
import {useEffect, useMemo, useRef, useState} from 'react';
import CardsArea from '../components/Sections/CardsArea';
import { Box, Center, Container, Grid, HStack, VStack } from '@chakra-ui/react';
import ActionField from '../components/Sections/ActionField';
import { CardType } from '../library/Card/CardTypes';
import { ChakraProvider, ColorModeScript, extendTheme, useColorMode, type ThemeConfig } from '@chakra-ui/react'


const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}


const theme = extendTheme({ config })

const Home: NextPage = () => {



  let suits = ['club', 'diamond', 'heart', 'spade']
  let ranks = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2']
  const dealtHand = useRef<any>({value: [{suit: 'heart',rank: '2'}, {suit: 'spade',rank: '2'}]});
  const flop = useRef<any>({value: [{suit: 'spade',rank: 'T'}, {suit: 'spade',rank: 'J'}, {suit: 'spade',rank: 'Q'}]});
  const turn = useRef<any>({value: [{suit: 'spade',rank: 'K'}]});
  const river = useRef<any>({value: [{suit: 'spade',rank: 'A'}]});

  

  return <Center p="50px">
    <Grid gap={4} templateRows={'repeat(3, 1fr)'} templateColumns='repeat(2, 1fr)' w='1200px'>  
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <CardsArea suits={suits} ranks={ranks} dealtHand={dealtHand} flop={flop} turn={turn} river={river} />
      <ActionField />
    </Grid>
  </Center>
}

export default Home
