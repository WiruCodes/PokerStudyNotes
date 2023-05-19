import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Box,
  HStack,
  Grid,
  GridItem,
  Center
} from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useState, useRef } from 'react';




function CommunityRangeModal(passedRange: any) {

  let suits = ['club', 'diamond', 'heart', 'spade']
  let ranks = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2']

  let suitGridCollection: string[] = [];
  let rankGridCollection: string[] = [];

  const [range, setRange] = useState<{suits: string[], ranks: string[]}>({
    suits: [],
    ranks: []
  })

  // check if mouse is down
  let mouseDown = false;
  let highlight = "";
  function mouseOverHandler(e: any) {
    // console.log(e.target.querySelector('.rank'))
    // console.log(highlight)

    
    if(mouseDown == true && (e.target.querySelector('.suit') || e.target.querySelector('.rank'))) {
      console.log(e.target)
      if (e.target.firstChild.style.backgroundColor == 'red' && highlight == "") {
        highlight = "remove"
        console.log(highlight)
      } else if (e.target.firstChild.style.backgroundColor !== 'red' && highlight == "") {
        highlight = "add"
      }
    }
    
    document.body.onmousedown = function(e) { 
      e.button == 0 && (mouseDown = true);
    }
    document.body.onmouseup = function(e) {
      e.button == 0 && (mouseDown = false);
      highlight = "";
    }
    
    let modalBody: HTMLElement = document.getElementsByClassName('chakra-modal__body')[0] as HTMLElement
    modalBody.onmouseleave = function() {
      highlight = "";
      mouseDown = false
    }

    if(mouseDown == true) {
      if(e.target.style.backgroundColor == 'red' && highlight == "remove"){
        if(e.target.className.split(" ")[0] == 'rank' && passedRange.current.value.ranks.indexOf(e.target.innerHTML) > -1) {
          e.target.style.backgroundColor = '';
          passedRange.current.value.ranks.splice(passedRange.current.value.ranks.indexOf(e.target.innerHTML), 1)
        }
        if(e.target.className.split(" ")[0] == 'suit' && passedRange.current.value.suits.indexOf(e.target.innerHTML) > -1) {
          e.target.style.backgroundColor = '';
          passedRange.current.value.suits.splice(passedRange.current.value.suits.indexOf(e.target.innerHTML), 1)
        }

      } else if (highlight == "add"){
        console.log(passedRange.current.value.ranks.indexOf(e.target.innerHTML))
        if(e.target.className.split(" ")[0] == 'rank' && passedRange.current.value.ranks.indexOf(e.target.innerHTML) == -1) {
          e.target.style.backgroundColor = 'red';
          passedRange.current.value.ranks.push(e.target.innerHTML)
        }
        if(e.target.className.split(" ")[0] == 'suit' && passedRange.current.value.suits.indexOf(e.target.innerHTML) == -1) {
          e.target.style.backgroundColor = 'red';
          passedRange.current.value.suits.push(e.target.innerHTML)
        }
      }
    }

  }

  function addSuit(e: any) {
    for(let i = 0; i < suitGridCollection.length; i++) {
      if(suitGridCollection[i] == e.target.id && e.target.style.backgroundColor == '') {
        e.target.style.backgroundColor = 'red'
        highlight = 'add'
        passedRange.current.value.suits.push(e.target.innerHTML)
        return;
      }
      if(suitGridCollection[i] == e.target.id && e.target.style.backgroundColor !== '') {
        e.target.style.backgroundColor = '';
        highlight = 'remove'
        passedRange.current.value.suits.splice(passedRange.current.value.suits.indexOf(e.target.innerHTML), 1)
        return;
      }
    }
  }

  function addRank(e: any) {
    for(let i = 0; i < rankGridCollection.length; i++) {
      if(rankGridCollection[i] == e.target.id && e.target.style.backgroundColor == '') {
        e.target.style.backgroundColor = 'red'
        highlight = 'add'
        passedRange.current.value.ranks.push(e.target.innerHTML)
        return;
      }
      if(rankGridCollection[i] == e.target.id && e.target.style.backgroundColor !== '') { 
        e.target.style.backgroundColor = '';
        highlight = 'remove'
        passedRange.current.value.ranks.splice(passedRange.current.value.ranks.indexOf(e.target.innerHTML), 1)
        return;
      }
    }
  }

  function Range() { 
    let colorOfGrid = ""
    let valueOfGrid = ""

    let suitCol = suits.map((suit,i) => {
      suitGridCollection.push(`grid_suit_col_${i}`)
      return <GridItem key={`community_suitCol_${i}`} onMouseDown={addSuit} onMouseOver={mouseOverHandler} rowSpan={1} colSpan={1}><Box key={`grid_suit_col_${i}`} id={`grid_suit_col_${i}`}  userSelect="none" width={95} height={7} backgroundColor={colorOfGrid} className={`suit ${valueOfGrid}`} border='solid 1px' borderRadius="4px" margin="1px">{suit}</Box></GridItem>
    })

    let rangeCol = ranks.map((rank,i) => {
      rankGridCollection.push(`grid_rank_col_${i}`)
      return <GridItem key={`community_rankCol_${i}`} onMouseDown={addRank} onMouseOver={mouseOverHandler} rowSpan={1} colSpan={1}><Box key={`grid_rank_col_${i}`} id={`grid_rank_col_${i}`}  userSelect="none" width={7} height={7} backgroundColor={colorOfGrid} className={`rank ${valueOfGrid}`} border='solid 1px' borderRadius="4px" margin="1px">{rank}</Box></GridItem>
    })

      // console.log(gridCollection)

      return <>
        <Grid onContextMenu={(e)=> e.preventDefault()} textAlign="center" fontStyle="Bold" fontWeight="600" display="flex" justifyContent="center" templateRows={'repeat(1, 1fr)'} templateColumns={'repeat(13, 1fr)'}>{suitCol}</Grid>
        <Grid onContextMenu={(e)=> e.preventDefault()} textAlign="center" fontStyle="Bold" fontWeight="600" display="flex" justifyContent="center" templateRows={'repeat(1, 1fr)'} templateColumns={'repeat(13, 1fr)'}>{rangeCol}</Grid>
      </>
  }

  
  // console.log(Range())
  function resetModal() {
    for(let i = 0; i <= 3; i++) {
      document.getElementById(`grid_suit_col_${i}`)!.style.backgroundColor = ""
    }

    for(let i = 0; i <= 12; i++) {
      document.getElementById(`grid_rank_col_${i}`)!.style.backgroundColor = ""
    }

    setRange({
      suits: [],
      ranks: []
    })
    passedRange.current.value = range
  }
  
  function modalOpen() {
    console.log(passedRange.current)
    setRange({
      suits: passedRange.current.value.suits,
      ranks: passedRange.current.value.ranks
      })

    setTimeout(() => {
      for(let i = 0; i <= 3; i++) {
        for(let k = 0;k < passedRange.current.value.suits.length; k++) {
          document.getElementById(`grid_suit_col_${i}`)!.textContent == passedRange.current.value.suits[k] && (document.getElementById(`grid_suit_col_${i}`)!.style.backgroundColor = 'red');
        }
      }
  
      for(let i = 0; i <= 12; i++) {
        for(let k = 0;k < passedRange.current.value.ranks.length; k++) {
          document.getElementById(`grid_rank_col_${i}`)!.textContent == passedRange.current.value.ranks[k] && (document.getElementById(`grid_rank_col_${i}`)!.style.backgroundColor = 'red');
        }
      }

      // make already picked cards disabled (figure out an algorithm for cards present on felt vs possible cards to come)

      // console.log(passedRange.current.usedCards)
      // switch(passedRange.current.buttonId) {
      //   case 'generate_flop':
      //     for(let i = 0; i <= 3; i++) {
      //       if(document.getElementById(`grid_suit_col_${i}`)!.textContent == passedRange.current.usedCards.dealtHand[0].suit && document.getElementById(`grid_rank_col_${i}`)!.textContent == passedRange.current.usedCards.dealtHand[0].rank){
      //         document.getElementById(`grid_suit_col_${i}`)!.textContent == passedRange.current.value.suits[k] && (document.getElementById(`grid_suit_col_${i}`)!.style.backgroundColor = 'red');
      //       }
      //     }
      //     break;
      //   case 'generate_turn':
      //     break;
      //   case 'generate_river':
      //     break;
      // }

    }, 1)
  }

  let rangeRef = useRef<any>(range)

  useEffect(() => {
    rangeRef.current = range
  },[range])

  function modalClose() {
    passedRange.current.value = rangeRef.current
    console.log(passedRange.current)

    if(passedRange.current.buttonId == 'generate_flop') {
      if((passedRange.current.value.suits.length > 0  && passedRange.current.value.ranks.length > 0) && ((passedRange.current.value.suits.length + passedRange.current.value.ranks.length) < 4)){
        document.getElementById(passedRange.current.buttonId)!.setAttribute('disabled', 'true');
        document.getElementById('tooltip_flop')!.style.display = 'block';
       
      } else {
        document.getElementById(passedRange.current.buttonId)!.removeAttribute('disabled');
        document.getElementById('tooltip_flop')!.style.display = 'none';
      }
    }

    if(passedRange.current.buttonId == 'generate_turn') {
      document.getElementById(passedRange.current.buttonId)!.removeAttribute('disabled');
      document.getElementById('tooltip_turn')!.style.display = 'none';
    }

    if(passedRange.current.buttonId == 'generate_river') {
      document.getElementById(passedRange.current.buttonId)!.removeAttribute('disabled');
      document.getElementById('tooltip_river')!.style.display = 'none';
    }
  }

  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Button size='xs' onClick={() => {
        onOpen()
        modalOpen()
      }}>{passedRange.current.modalText[1]}</Button>

      <Modal isOpen={isOpen} onClose={() => {
        onClose()
        modalClose()
      }} size={'lg'} isCentered>
        {/* <ModalOverlay /> */}
        <ModalContent>
          <ModalHeader>{passedRange.current.modalText[0]}</ModalHeader>
          <ModalCloseButton />
          <ModalBody display="flex" justifyContent="center">
            <Box w={[300]} h={[75]}>
              <Range />
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' size="sm" mr={3} onClick={() => {
              onClose()
              modalClose()
            }}>
              Close
            </Button>
            <Button variant='ghost' size="sm" onClick={resetModal}>Reset</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )

}

export default CommunityRangeModal;