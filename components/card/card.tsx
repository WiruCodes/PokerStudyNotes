import { Box,Text, Hide } from '@chakra-ui/react';
import {BsSuitClubFill, BsSuitDiamondFill, BsSuitSpadeFill, BsSuitHeartFill} from 'react-icons/bs';
import styles from "./card.module.css";
import { useEffect, useState } from 'react';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
  Button,
  GridItem,
  Grid
} from '@chakra-ui/react'

function getSVGPath(suit: string) {
  let path = ''
  suit == 'club' && (path = BsSuitClubFill({}).props.children[0].props.d)
  suit == 'spade' && (path = BsSuitSpadeFill({}).props.children[0].props.d)
  suit == 'diamond' && (path = BsSuitDiamondFill({}).props.children[0].props.d)
  suit == 'heart' && (path = BsSuitHeartFill({}).props.children[0].props.d)

  return path;
}

function Card({suit, rank, cardId, existingCards}: {suit: string, rank: string, cardId: string, existingCards: any}) {
  let suits = ['club', 'diamond', 'heart', 'spade']
  let ranks = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2']

  let gradients: {[key: string]: string} = {
    club: "radial-gradient(circle, hsla(105, 71%, 44%, 1) 0%, hsla(109, 70%, 36%, 1) 100%)",
    diamond: "radial-gradient(circle, hsla(240, 69%, 33%, 1) 0%, hsla(217, 82%, 57%, 1) 100%)",
    heart: "radial-gradient(circle, hsla(0, 82%, 39%, 1) 0%, hsla(0, 100%, 55%, 1) 100%)",
    spade: "radial-gradient(circle, hsla(0, 0%, 0%, 1) 0%, hsla(0, 2%, 23%, 1) 100%)"
  }

  function Range() { 

  
    let suitCol = suits.map((suit,i) => {
      return <GridItem key={`card_suitCol_${i}`} rowSpan={1} colSpan={1}><Box key={`${cardId}_suit_col_${i}`} id={`${cardId}_suit_col_${i}`}  userSelect="none" width={95} height={7} border='solid 1px' borderRadius="4px" margin="1px">{suit}</Box></GridItem>
    })

    let rangeCol = ranks.map((rank,i) => {
      return <GridItem key={`card_rankCol_${i}`} rowSpan={1} colSpan={1}><Box key={`${cardId}_rank_col_${i}`} id={`${cardId}_rank_col_${i}`}  userSelect="none" width={7} height={7} border='solid 1px' borderRadius="4px" margin="1px">{rank}</Box></GridItem>
    })

      // console.log(gridCollection)

      return <>
        <Grid onContextMenu={(e)=> e.preventDefault()} onClick={clickGridHandler} textAlign="center" fontStyle="Bold" fontWeight="600" display="flex" justifyContent="center" templateRows={'repeat(1, 1fr)'} templateColumns={'repeat(13, 1fr)'}>{suitCol}</Grid>
        <Grid onContextMenu={(e)=> e.preventDefault()} onClick={clickGridHandler} textAlign="center" fontStyle="Bold" fontWeight="600" display="flex" justifyContent="center" templateRows={'repeat(1, 1fr)'} templateColumns={'repeat(13, 1fr)'}>{rangeCol}</Grid>
      </>
  }

  function clickGridHandler(e: any) {
    for(let k = 0; k < suits.length; k++) {
      if(suits.includes(e.target.textContent)) {
        if(e.target.textContent == suits[k] && e.target!.style.opacity == '1') {
          document.getElementById(`${cardId}_suit_col_${k}`)!.style.backgroundColor = 'red';
          
          let chosenGradient = gradients[suits[k]]
          let svgPath = getSVGPath(suits[k]); 
          let card = document.getElementById(cardId);
          
          card!.getElementsByClassName('suit')[0].firstElementChild?.remove()

          const svg = `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" color="white" class="card_responsiveIcons__Lcq0b" style="color:white" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="${svgPath}"></path></svg>`
          
          card!.getElementsByClassName('suit')[0].innerHTML = svg;
          card!.style.background = chosenGradient;
          card!.getElementsByClassName('suit')[0]!.setAttribute('data-id', suits[k]);

          changeCardValue(cardId, 'suit', suits[k])
          popoverGridHandler();

        }
        (e.target.textContent !== suits[k] && e.target!.style.opacity == '1') && (document.getElementById(`${cardId}_suit_col_${k}`)!.style.backgroundColor = 'transparent');
      }
    }

    for(let k = 0; k < ranks.length; k++) {
      if(ranks.includes(e.target.textContent)) {
        if(e.target.textContent == ranks[k] && e.target!.style.opacity == '1'){
          document.getElementById(`${cardId}_rank_col_${k}`)!.style.backgroundColor = 'red'
          document.getElementById(cardId)!.getElementsByClassName('rank')[0].textContent = ranks[k];
          changeCardValue(cardId, 'rank', ranks[k])
          popoverGridHandler();
        }
        (e.target.textContent !== ranks[k] && e.target!.style.opacity == '1') && (document.getElementById(`${cardId}_rank_col_${k}`)!.style.backgroundColor = 'transparent');
      }
    }


    // loop data id, if there is existing card that has red rank, with non red suit, make suit 0.5 opacity else opacity 1

    for(let k = 0; k < suits.length; k++) {
      if(document.getElementById(`${cardId}_suit_col_${k}`)!.style.backgroundColor !== 'red') {
        document.getElementById(`${cardId}_suit_col_${k}`)!.style.backgroundColor = 'transparent'
        document.getElementById(`${cardId}_suit_col_${k}`)!.style.opacity = '1'
      }
    }

    for(let l = 0; l < ranks.length; l++) {
      if(document.getElementById(`${cardId}_rank_col_${l}`)!.style.backgroundColor !== 'red') {
        document.getElementById(`${cardId}_rank_col_${l}`)!.style.backgroundColor = 'transparent'
        document.getElementById(`${cardId}_rank_col_${l}`)!.style.opacity = '1'
      }
    }

    // 0.5 opaque for suits
    for(let i = 0; i < suits.length; i++) {
      // console.log(document.getElementById(`${cardId}_suit_col_${i}`))
        
      for(let j = 0; j < ranks.length; j++) {
        for(let k = 0; k < existingCards.length; k++) {
          for(let l = 0; l < existingCards[k].current.value.length; l++) {
            if(document.getElementById(`${cardId}_suit_col_${i}`)!.style.backgroundColor !== 'red' && document.getElementById(`${cardId}_rank_col_${j}`)!.style.backgroundColor == 'red' && existingCards[k].current.value[l].suit == suits[i] && existingCards[k].current.value[l].rank == ranks[j]) {
              // console.log(existingCards[k].current.value[l])
              document.getElementById(`${cardId}_suit_col_${i}`)!.style.opacity = '0.5';
            }

            if(document.getElementById(`${cardId}_suit_col_${i}`)!.style.backgroundColor == 'red' && document.getElementById(`${cardId}_rank_col_${j}`)!.style.backgroundColor !== 'red' && existingCards[k].current.value[l].suit == suits[i] && existingCards[k].current.value[l].rank == ranks[j]) {
              // console.log(existingCards[k].current.value[l])
              document.getElementById(`${cardId}_rank_col_${j}`)!.style.opacity = '0.5';
            }

          }
        }
      }

    }

  }





  function grayOutExisitingCards() {

    const clearPopover = () => {
      for(let k = 0; k < suits.length; k++) {
        document.getElementById(`${cardId}_suit_col_${k}`)!.style.backgroundColor = 'transparent'
        document.getElementById(`${cardId}_suit_col_${k}`)!.style.opacity = '1'
      }
  
      for(let l = 0; l < ranks.length; l++) {
        document.getElementById(`${cardId}_rank_col_${l}`)!.style.backgroundColor = 'transparent'
        document.getElementById(`${cardId}_rank_col_${l}`)!.style.opacity = '1'
      }
    }
    clearPopover();



    for(let i = 0; i < existingCards.length; i++) {
      
      for(let j = 0; j < existingCards[i].current.value.length; j++) {
        let card = existingCards[i].current.value[j];
        let cardIdCollection = ['hand1', 'hand2', 'community_0', 'community_1', 'community_2', 'community_3', 'community_4']

        cardIdCollection.forEach((cardIdCollectionItem) => {
          if(card.suit == document.getElementById(cardIdCollectionItem)?.querySelector('.suit')?.getAttribute('data-id') && card.rank == document.getElementById(cardIdCollectionItem)?.querySelector('.rank')?.textContent) {
            for(let k = 0; k < suits.length; k++) {

              if(document.getElementById(`${cardIdCollectionItem}_suit_col_${k}`)!.textContent == card.suit) {
                if(`${cardIdCollectionItem}_suit_col_${k}` == `${cardId}_suit_col_${k}`) {
                  document.getElementById(`${cardId}_suit_col_${k}`)!.style.backgroundColor = 'red'
                }
              }
              
            }

            for(let l = 0; l < ranks.length; l++) {
              if(document.getElementById(`${cardIdCollectionItem}_rank_col_${l}`)!.textContent == card.rank) {
                if(`${cardIdCollectionItem}_rank_col_${l}` == `${cardId}_rank_col_${l}`) {
                  document.getElementById(`${cardId}_rank_col_${l}`)!.style.backgroundColor = 'red'
                }
              }
            }

            
          }
        })

      }

    }
    popoverGridHandler();
  }

  // loop again for .5 opacity and pointer-events none for grid

  function popoverGridHandler() {

    const getRedSuit = () => {
      for(let i = 0; i < suits.length; i++) {
        if(document.getElementById(`${cardId}_suit_col_${i}`)!.style!.backgroundColor == 'red') {
          return document.getElementById(`${cardId}_suit_col_${i}`)?.textContent;
        }
      }
    }
    let redSuit = getRedSuit()

    const getRedRank = () => {
      for(let i = 0; i < ranks.length; i++) {
        if(document.getElementById(`${cardId}_rank_col_${i}`)!.style!.backgroundColor == 'red') {
          return document.getElementById(`${cardId}_rank_col_${i}`)?.textContent;
        }
      }
    }
    let redRank = getRedRank()

    for(let i = 0; i < existingCards.length; i++) {
      for(let j = 0; j < existingCards[i].current.value.length; j++) {

        for(let l = 0; l < ranks.length; l++) {
          if(document.getElementById(`${cardId}_rank_col_${l}`)!.textContent == existingCards[i].current.value[j].rank) {
            if(document.getElementById(`${cardId}_rank_col_${l}`)!.style.backgroundColor !== `red` && existingCards[i].current.value[j].suit == redSuit) {
              document.getElementById(`${cardId}_rank_col_${l}`)!.style.opacity = '0.5'
            }


          } 
        }

        for(let l = 0; l < suits.length; l++) {
          if(document.getElementById(`${cardId}_suit_col_${l}`)!.textContent == existingCards[i].current.value[j].suit) {
            if(document.getElementById(`${cardId}_suit_col_${l}`)!.style.backgroundColor !== `red` && existingCards[i].current.value[j].rank == redRank) {
              document.getElementById(`${cardId}_suit_col_${l}`)!.style.opacity = '0.5'
            }
          } 

        }  

      }
    }
  }

  function changeCardValue(cardReference: string, valueType: string, valueOfCard: string) {
    switch(cardReference) {
      case 'hand1':
        valueType == 'suit' && (existingCards[0].current.value[0].suit = valueOfCard);
        valueType == 'rank' && (existingCards[0].current.value[0].rank = valueOfCard);
        break;
      case 'hand2':
        valueType == 'suit' && (existingCards[0].current.value[1].suit = valueOfCard);
        valueType == 'rank' && (existingCards[0].current.value[1].rank = valueOfCard);
        break;
      case 'community_0':
        valueType == 'suit' && (existingCards[1].current.value[0].suit = valueOfCard);
        valueType == 'rank' && (existingCards[1].current.value[0].rank = valueOfCard);
        break;
      case 'community_1':
        valueType == 'suit' && (existingCards[1].current.value[1].suit = valueOfCard);
        valueType == 'rank' && (existingCards[1].current.value[1].rank = valueOfCard);
        break;
      case 'community_2':
      valueType == 'suit' && (existingCards[1].current.value[2].suit = valueOfCard);
      valueType == 'rank' && (existingCards[1].current.value[2].rank = valueOfCard);
      break;
      case 'community_3':
        valueType == 'suit' && (existingCards[2].current.value[0].suit = valueOfCard);
        valueType == 'rank' && (existingCards[2].current.value[0].rank = valueOfCard);
        break;
      case 'community_4':
        valueType == 'suit' && (existingCards[3].current.value[0].suit = valueOfCard);
        valueType == 'rank' && (existingCards[3].current.value[0].rank = valueOfCard);
        break;
    }
  }

  return (
    <Popover>
        <Box id={cardId} userSelect='none' p={3} borderWidth='2px' borderRadius={5} maxW={50} maxH={75} minW={[25, 37.5, 50]} minH={[37.5, 50, 75]} w={[25, 37.5, 50]} h={[37.5, 50, 75]} display="inline-block" position="relative" background={gradients[suit]} m={["2px", "5px", "10px"]} >
          <Box position="absolute" className="suit" data-id={suit} top="0px" left="0px" mt={["1px", "2.5px", "3px"]} ml={["1px", "1px", "1px"]}  >
            {suit == 'club' && <BsSuitClubFill  color="white" className={styles.responsiveIcons} />}
            {suit == 'diamond' && <BsSuitDiamondFill color="white" className={styles.responsiveIcons} />}
            {suit == 'heart' && <BsSuitHeartFill color="white" className={styles.responsiveIcons} />}
            {suit == 'spade' && <BsSuitSpadeFill color="white" className={styles.responsiveIcons} />}
          </Box>
          <Text position="absolute" className="rank" bottom={["2px", "3.5px", "5px"]} right={["2px", "3.5px", "5px"]} fontSize={["25px", "30px", "50px"]} color="white" fontWeight="bold" lineHeight="1em">{rank}</Text>
          <PopoverTrigger>
            <Box onClick={grayOutExisitingCards} position="absolute" top={0} left={0} zIndex={1} w='100%' h='100%'></Box>
          </PopoverTrigger>
        </Box>
      <PopoverContent w={450} h={100}>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverBody mt={4}>{Range()}</PopoverBody>
      </PopoverContent>
    </Popover>
  )
}


export default Card;