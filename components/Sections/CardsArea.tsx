import { Box, Button, Grid, GridItem, HStack, Tooltip, VStack } from "@chakra-ui/react";
import Card from "../card/card";
import { CardType } from "../../library/Card/CardTypes";
import GenerateHand from "../../library/Card/HandHandler";
import GenerateFlop from "../../library/Card/FlopHandler";
import GenerateTurn from "../../library/Card/TurnHandler";
import GenerateRiver from "../../library/Card/RiverHandler";
import RangeModal from "../card_range_modal/RangeModal";
import { useEffect, useRef, useState } from "react";
import CommunityRangeModal from "../card_range_modal/CommunityRangeModal";
import { FaInfo } from "react-icons/fa";
import HandHistory from './HandHistory';

function CardsArea({
  suits,
  ranks,
  dealtHand,  
  flop,
  turn,
  river
}: {
  suits: string[];
  ranks: string[];
  dealtHand: any;
  flop: any;
  turn: any;
  river: any;
}) {
  


  function Hand() {

    let passedRange = useRef<any | null>({
      pocket: [],
      suited: [],
      unsuited: [],
      value: {
        pocket: [],
        suited: [],
        unsuited: [],
      },
      modalText: ['Hand Range', 'Hand Range']
    });

    const dealtHandPrev = useRef();

    return (
      <GridItem
        rowSpan={1}
        colSpan={1}
        border="solid 1px"
        borderRadius="2px"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <VStack>
          <Box>
            <Card key={"hand1"} suit={dealtHand.current.value[0].suit} rank={dealtHand.current.value[0].rank} cardId="hand1" existingCards={[dealtHand, flop, turn, river]} />
            <Card key={"hand2"} suit={dealtHand.current.value[1].suit} rank={dealtHand.current.value[1].rank} cardId="hand2" existingCards={[dealtHand, flop, turn, river]} />
          </Box>
          <Box>
            <Box  textAlign='center'>
              <Box m='10px'>
                <Button size='xs' onClick={() => GenerateHand(dealtHand, flop, turn, river, passedRange, dealtHandPrev)}>Generate Hand</Button>
              </Box>
              <Box m='10px'>
                <RangeModal {...passedRange}  />
              </Box>
            </Box>
          </Box>
        </VStack>
      </GridItem>
    );
  }

  function Flop() {

    let passedRange = useRef<any | null>({
      suits: [],
      ranks: [],
      value: {
        suits: [],
        ranks: []
      },
      modalText: ['Flop Range', 'Flop Range'],
      buttonId: 'generate_flop',
      usedCards: [dealtHand, flop, turn, river]
    });

    // make i icon visible if generate flop is disabled which shows a tooltip

    const flopPrev = useRef();
    return (
      <Box  padding='10px'>
        <VStack>
          <Box>
            {flop.current.value.map((flopItem: any, i: any) => {
              return <Card key={'community_'+ i} suit={flopItem.suit} rank={flopItem.rank} cardId={'community_'+ i} existingCards={[dealtHand, flop, turn, river]} />;
            })}
          </Box>
          <Box textAlign='center'>
            <Box m='10px' display='flex'>
              <Button size='xs' id="generate_flop" onClick={() => GenerateFlop(suits, ranks, dealtHand, flop, turn, river, passedRange, flopPrev)}>Generate Flop</Button>
              <Tooltip label={'Please add more ranks/suits or avoid using already present cards on the table.'} placement='top' textAlign='center' >
                <span id="tooltip_flop" style={{display: 'none', marginTop: '5px'}}><FaInfo /></span>
              </Tooltip>
            </Box>
            <Box m='10px'>
              {/* <RangeModal {...passedRange}  /> */}
              <CommunityRangeModal {...passedRange} />
            </Box>
          </Box>
        </VStack>
      </Box>
    );
  }

  function Turn() {

    let passedRange = useRef<any | null>({
      suits: [],
      ranks: [],
      value: {
        suits: [],
        ranks: []
      },
      modalText: ['Turn Range', 'Turn Range'],
      buttonId: 'generate_turn',
      usedCards: [dealtHand, flop, turn, river]
    });

    const turnPrev = useRef();
    return <Box  padding='10px'>
        <VStack>
          <Box>
            <Card key={'community_'+ 3} suit={turn.current.value[0].suit} rank={turn.current.value[0].rank} cardId={'community_'+ 3} existingCards={[dealtHand, flop, turn, river]} />
          </Box>
          <Box textAlign='center'>
            <Box m='10px' display='flex' flexDirection='row'>
              <Button size='xs' id='generate_turn' onClick={() => GenerateTurn(suits, ranks, dealtHand, flop, turn, river, passedRange, turnPrev)}>Generate Turn</Button>
              <Tooltip label={'Please add more ranks/suits or avoid using already present cards on the table.'} placement='top' textAlign='center' >
                <span id="tooltip_turn" style={{display: 'none', marginTop: '5px'}}><FaInfo /></span>
              </Tooltip>
            </Box>
            <Box m='10px'>
              {/* <RangeModal {...passedRange}  /> */}
              <CommunityRangeModal {...passedRange} />
            </Box>
          </Box>
        </VStack>
      </Box>
  }

  function River() {

    let passedRange = useRef<any | null>({
      suits: [],
      ranks: [],
      value: {
        suits: [],
        ranks: []
      },
      modalText: ['River Range', 'River Range'],
      buttonId: 'generate_river',
      usedCards: [dealtHand, flop, turn, river]
    });

    const riverPrev = useRef();
    return <Box padding='10px'>
        <VStack>
          <Box>
            <Card key={'community_'+ 4} suit={river.current.value[0].suit} rank={river.current.value[0].rank} cardId={'community_'+ 4} existingCards={[dealtHand, flop, turn, river]} />
          </Box>
          <Box textAlign='center'>
            <Box m='10px' display='flex' flexDirection='row'>
              <Button size='xs' id='generate_river' onClick={() => GenerateRiver(suits, ranks, dealtHand, flop, turn, river, passedRange, riverPrev)}>Generate River</Button>
              <Tooltip  label={'Please add more ranks/suits or avoid using already present cards on the table.'} placement='top' textAlign='center' >
                <span id="tooltip_river" style={{display: 'none', marginTop: '5px'}}><FaInfo /></span>
              </Tooltip>
            </Box>
            <Box m='10px'>
              {/* <RangeModal {...passedRange}  /> */}
              <CommunityRangeModal {...passedRange} />
            </Box>
          </Box>
        </VStack>
      </Box>
  }

  return (
    <GridItem
      colSpan={2}
      rowSpan={1}
      minW='1200px'
      minH='500px'
      border="solid 1px"
      borderRadius="2px"
    >
      <Grid
        gap={4}
        w="100%"
        h="100%"
        p="10px"
        templateRows="repeat(1, 1fr)"
        templateColumns="repeat(4, 1fr)"
      >
        <Hand />
        <GridItem
          rowSpan={1}
          colSpan={2}
          border="solid 1px"
          borderRadius="2px"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <VStack>
            <Box display='flex' >
              <Flop />
              <Turn />
              <River />
            </Box>
          </VStack>
        </GridItem>
        <GridItem 
          rowSpan={1}
          colSpan={1}
          border="solid 1px"
          borderRadius="2px"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <VStack>
            <HandHistory />
          </VStack>
        </GridItem>
      </Grid>
    </GridItem>
  );
}

export default CardsArea;
