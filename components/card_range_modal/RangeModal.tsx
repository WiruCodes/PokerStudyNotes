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

function RangeModal(passedRange: any) {
  
  // let range: {pocket: string[], suited: string[], unsuited: string[]} = {
  //   pocket: [], 
  //   suited: [], 
  //   unsuited: []
  // }
  // console.log(range)
  const [range, setRange] = useState<{pocket: string[], suited: string[], unsuited: string[]}>({
    pocket: [], 
    suited: [], 
    unsuited: []
  })
  

  let suits = ['club', 'diamond', 'heart', 'spade']
  let ranks = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2',]

  // let [straightOrDiagonalCheck, setStraightOrDiagonalCheck] = useState<Array<Array<number>>>([]);
  let straightOrDiagonalCheck = useRef<any>([]);


  // console.log(straightOrDiagonalCheck);
  // check if mouse is down
  let mouseDown = false;
  let highlight = "";
  function mouseOverHandler(e: any) {

    if (e.target.style.backgroundColor == 'red' && highlight == "") {
      highlight = "remove"
    } else if (e.target.style.backgroundColor !== 'red' && highlight == "") {
      highlight = "add"
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
        // console.log(e.target.style.backgroundColor)
        gridColorHandler(e.target);

        (e.target.className.split(" ")[0] == "pocket") && rangeHandler(e.target, "remove");
        (e.target.className.split(" ")[0] == "suited") && rangeHandler(e.target, "remove");
        (e.target.className.split(" ")[0] == "unsuited") && rangeHandler(e.target, "remove");

      } else if (highlight == "add"){
        e.target.style.backgroundColor = 'red';
        (e.target.className.split(" ")[0] == "pocket") && rangeHandler(e.target, "add");
        (e.target.className.split(" ")[0] == "suited") && rangeHandler(e.target, "add");
        (e.target.className.split(" ")[0] == "unsuited") && rangeHandler(e.target, "add");
      }
    }

  }

  // add and removal for range of cards for card generator
  function rangeHandler(grid: HTMLElement | any, action: string) {
    // console.log(grid.textContent)
    if (action == "add") {
      (grid.className.split(" ")[0] == "pocket" && range.pocket.indexOf(grid.textContent) == -1) && (range.pocket.push(grid.textContent));
      (grid.className.split(" ")[0] == "unsuited" && range.unsuited.indexOf(grid.textContent) == -1) && (range.unsuited.push(grid.textContent));
      (grid.className.split(" ")[0] == "suited" && range.suited.indexOf(grid.textContent) == -1) && (range.suited.push(grid.textContent));
    } else if (action == "remove") {
      (grid.className.split(" ")[0] == "pocket" && range.pocket.indexOf(grid.textContent) >= 0) && range.pocket.splice(range.pocket.indexOf(grid.textContent), 1);
      (grid.className.split(" ")[0] == "unsuited" && range.unsuited.indexOf(grid.textContent) >= 0) && range.unsuited.splice(range.unsuited.indexOf(grid.textContent), 1);
      (grid.className.split(" ")[0] == "suited" && range.suited.indexOf(grid.textContent) >= 0) && range.suited.splice(range.suited.indexOf(grid.textContent), 1);
    }
    // console.log(range)
  }

  function addRank(e: any) {

    if (e.button == 0) {
      if(e.target.style.backgroundColor == 'red'){
        // console.log(e.target.className.split(" ")[0])
        gridColorHandler(e.target);
        rangeHandler(e.target, "remove");
      } else{
        e.target.style.backgroundColor = 'red';
        rangeHandler(e.target, "add");
      }     
    }
    
    if (e.button == 2) {
      // console.log(e.target.id)
      let gridRowNumber: number[] = [];
      let collect = '';

      // collecting row and column coordinate of the grid
      for(let i = 0; i < e.target.id.length; i++) {
        if(Number(e.target.id[i]) >= 0) {
          // console.log(e.target.id[i])
          collect += e.target.id[i]
          // console.log(collect)
        } else if(collect !== '') {
          // console.log(collect)
          gridRowNumber.push(Number(collect))
          collect = ''
        }
      }
      gridRowNumber.push(Number(collect))
      // console.log(gridRowNumber)
      // setStraightOrDiagonalCheck((prevState: number[] | any) => [...prevState, gridRowNumber])
      straightOrDiagonalCheck.current = [...straightOrDiagonalCheck.current, gridRowNumber]
      // console.log(straightOrDiagonalCheck.current.length);

      // Handling multiple grid highlighting
      if(straightOrDiagonalCheck.current.length == 2) {
        (Math.abs(straightOrDiagonalCheck.current[0][0] - straightOrDiagonalCheck.current[1][0]) == Math.abs(straightOrDiagonalCheck.current[0][1] - straightOrDiagonalCheck.current[1][1])) && highlightGrids('diagonal');
        (Math.abs(straightOrDiagonalCheck.current[0][0] - straightOrDiagonalCheck.current[1][0]) == 0) && highlightGrids('x axis line');
        (Math.abs(straightOrDiagonalCheck.current[0][1] - straightOrDiagonalCheck.current[1][1]) == 0) && highlightGrids('y axis line');
  
        straightOrDiagonalCheck.current = []
      }
    }
  } 

  function highlightGrids(lineType: string) {
    let GridCheck1 = document.getElementById(`grid_row_${straightOrDiagonalCheck.current[0][0]}_col_${straightOrDiagonalCheck.current[0][1]}`)!.style.backgroundColor == 'red' ? true : false;
    let GridCheck2 = document.getElementById(`grid_row_${straightOrDiagonalCheck.current[1][0]}_col_${straightOrDiagonalCheck.current[1][1]}`)!.style.backgroundColor == 'red' ? true : false;
    switch(lineType) {
      case 'diagonal':
        let numberOfGridsDiagonal = Math.abs(straightOrDiagonalCheck.current[0][0] - straightOrDiagonalCheck.current[1][0]);
        if((straightOrDiagonalCheck.current[0][0] > straightOrDiagonalCheck.current[1][0]) && (straightOrDiagonalCheck.current[0][1] > straightOrDiagonalCheck.current[1][1])) {
          for(let i = 0; i <= numberOfGridsDiagonal; i++) {
            if(GridCheck1) {
              gridColorHandler(document.getElementById(`grid_row_${straightOrDiagonalCheck.current[1][0] + i}_col_${straightOrDiagonalCheck.current[1][1] + i}`))
              rangeHandler(document.getElementById(`grid_row_${straightOrDiagonalCheck.current[1][0] + i}_col_${straightOrDiagonalCheck.current[1][1] + i}`), "remove")
            } else {
              document.getElementById(`grid_row_${straightOrDiagonalCheck.current[1][0] + i}_col_${straightOrDiagonalCheck.current[1][1] + i}`)!.style.backgroundColor = 'red'
              rangeHandler(document.getElementById(`grid_row_${straightOrDiagonalCheck.current[1][0] + i}_col_${straightOrDiagonalCheck.current[1][1] + i}`), "add")
            }
          }
        } else if ((straightOrDiagonalCheck.current[0][0] > straightOrDiagonalCheck.current[1][0]) && (straightOrDiagonalCheck.current[0][1] < straightOrDiagonalCheck.current[1][1])) {
          for(let i = 0; i <= numberOfGridsDiagonal; i++) {
            if(GridCheck1) {
              gridColorHandler(document.getElementById(`grid_row_${straightOrDiagonalCheck.current[1][0] + i}_col_${straightOrDiagonalCheck.current[1][1] - i}`))
              rangeHandler(document.getElementById(`grid_row_${straightOrDiagonalCheck.current[1][0] + i}_col_${straightOrDiagonalCheck.current[1][1] - i}`), "remove")
            } else {
              document.getElementById(`grid_row_${straightOrDiagonalCheck.current[1][0] + i}_col_${straightOrDiagonalCheck.current[1][1] - i}`)!.style.backgroundColor = 'red'
              rangeHandler(document.getElementById(`grid_row_${straightOrDiagonalCheck.current[1][0] + i}_col_${straightOrDiagonalCheck.current[1][1] - i}`), "add")
            }
          }
        } else if ((straightOrDiagonalCheck.current[0][0] < straightOrDiagonalCheck.current[1][0]) && (straightOrDiagonalCheck.current[0][1] < straightOrDiagonalCheck.current[1][1])) {
          for(let i = 0; i <= numberOfGridsDiagonal; i++) {
            if(GridCheck1) {
              gridColorHandler(document.getElementById(`grid_row_${straightOrDiagonalCheck.current[1][0] - i}_col_${straightOrDiagonalCheck.current[1][1] - i}`))
              rangeHandler(document.getElementById(`grid_row_${straightOrDiagonalCheck.current[1][0] - i}_col_${straightOrDiagonalCheck.current[1][1] - i}`), "remove")
              } else {
                document.getElementById(`grid_row_${straightOrDiagonalCheck.current[1][0] - i}_col_${straightOrDiagonalCheck.current[1][1] - i}`)!.style.backgroundColor = 'red'
                rangeHandler(document.getElementById(`grid_row_${straightOrDiagonalCheck.current[1][0] - i}_col_${straightOrDiagonalCheck.current[1][1] - i}`), "add")
            }
          }
        } else if ((straightOrDiagonalCheck.current[0][0] < straightOrDiagonalCheck.current[1][0]) && (straightOrDiagonalCheck.current[0][1] > straightOrDiagonalCheck.current[1][1])) {
          for(let i = 0; i <= numberOfGridsDiagonal; i++) {
            if(GridCheck1) {
              gridColorHandler(document.getElementById(`grid_row_${straightOrDiagonalCheck.current[1][0] - i}_col_${straightOrDiagonalCheck.current[1][1] + i}`))
              rangeHandler(document.getElementById(`grid_row_${straightOrDiagonalCheck.current[1][0] - i}_col_${straightOrDiagonalCheck.current[1][1] + i}`), "remove")
            } else {
              document.getElementById(`grid_row_${straightOrDiagonalCheck.current[1][0] - i}_col_${straightOrDiagonalCheck.current[1][1] + i}`)!.style.backgroundColor = 'red'
              rangeHandler(document.getElementById(`grid_row_${straightOrDiagonalCheck.current[1][0] - i}_col_${straightOrDiagonalCheck.current[1][1] + i}`), "add")
            }
          }
        }
        break;
      case 'x axis line':
        let numberOfGridsXAxis = Math.abs(straightOrDiagonalCheck.current[0][1] - straightOrDiagonalCheck.current[1][1]);
        if(straightOrDiagonalCheck.current[0][1] > straightOrDiagonalCheck.current[1][1]) {
          for(let i = 0; i <= numberOfGridsXAxis; i++) {
            if(GridCheck1) {
              gridColorHandler(document.getElementById(`grid_row_${straightOrDiagonalCheck.current[1][0]}_col_${straightOrDiagonalCheck.current[1][1] + i}`))
              rangeHandler(document.getElementById(`grid_row_${straightOrDiagonalCheck.current[1][0]}_col_${straightOrDiagonalCheck.current[1][1] + i}`), "remove")
            } else{
              document.getElementById(`grid_row_${straightOrDiagonalCheck.current[1][0]}_col_${straightOrDiagonalCheck.current[1][1] + i}`)!.style.backgroundColor = 'red'
              rangeHandler(document.getElementById(`grid_row_${straightOrDiagonalCheck.current[1][0]}_col_${straightOrDiagonalCheck.current[1][1] + i}`), "add")
            }
          }
        } else if (straightOrDiagonalCheck.current[0][1] < straightOrDiagonalCheck.current[1][1]) {
          for(let i = 0; i <= numberOfGridsXAxis; i++) {
            if(GridCheck1) {
              gridColorHandler(document.getElementById(`grid_row_${straightOrDiagonalCheck.current[1][0]}_col_${straightOrDiagonalCheck.current[1][1] - i}`))
              rangeHandler(document.getElementById(`grid_row_${straightOrDiagonalCheck.current[1][0]}_col_${straightOrDiagonalCheck.current[1][1] - i}`), "remove")
            } else {
              document.getElementById(`grid_row_${straightOrDiagonalCheck.current[1][0]}_col_${straightOrDiagonalCheck.current[1][1] - i}`)!.style.backgroundColor = 'red'
              rangeHandler(document.getElementById(`grid_row_${straightOrDiagonalCheck.current[1][0]}_col_${straightOrDiagonalCheck.current[1][1] - i}`), "add")
            }
          }
        }
        break;
      case 'y axis line':
        let numberOfGridsYAxis = Math.abs(straightOrDiagonalCheck.current[0][0] - straightOrDiagonalCheck.current[1][0]);
        if(straightOrDiagonalCheck.current[0][0] > straightOrDiagonalCheck.current[1][0]) {
          for(let i = 0; i <= numberOfGridsYAxis; i++) {
            if(GridCheck1 && GridCheck2) {
              gridColorHandler(document.getElementById(`grid_row_${straightOrDiagonalCheck.current[0][0] - i}_col_${straightOrDiagonalCheck.current[0][1]}`))
              rangeHandler(document.getElementById(`grid_row_${straightOrDiagonalCheck.current[0][0] - i}_col_${straightOrDiagonalCheck.current[0][1]}`), "remove")
            } else {
              document.getElementById(`grid_row_${straightOrDiagonalCheck.current[0][0] - i}_col_${straightOrDiagonalCheck.current[0][1]}`)!.style.backgroundColor = 'red'
              rangeHandler(document.getElementById(`grid_row_${straightOrDiagonalCheck.current[0][0] - i}_col_${straightOrDiagonalCheck.current[0][1]}`), "add")
            }
          }
        } else if (straightOrDiagonalCheck.current[0][0] < straightOrDiagonalCheck.current[1][0]) {
          for(let i = 0; i <= numberOfGridsYAxis; i++) {
            if(GridCheck1 && GridCheck2) {
              // console.log(`grid_row_${straightOrDiagonalCheck.current[0][0]}_col_${straightOrDiagonalCheck.current[0][1]}`)
              gridColorHandler(document.getElementById(`grid_row_${straightOrDiagonalCheck.current[0][0] + i}_col_${straightOrDiagonalCheck.current[1][1]}`))
              rangeHandler(document.getElementById(`grid_row_${straightOrDiagonalCheck.current[0][0] + i}_col_${straightOrDiagonalCheck.current[1][1]}`), "remove")
            } else {
              document.getElementById(`grid_row_${straightOrDiagonalCheck.current[0][0] + i}_col_${straightOrDiagonalCheck.current[1][1]}`)!.style.backgroundColor = 'red'
              rangeHandler(document.getElementById(`grid_row_${straightOrDiagonalCheck.current[0][0] + i}_col_${straightOrDiagonalCheck.current[1][1]}`), "add")
            }
          }
        }
        break;
    }
  }

  // grid color handler
  function gridColorHandler(grid:HTMLElement | null) {
    grid!.className.split(" ")[0] == "pocket" && (grid!.style.backgroundColor = '#00aedb');
    grid!.className.split(" ")[0] == "unsuited" && (grid!.style.backgroundColor = '#f37735');
    grid!.className.split(" ")[0] == "suited" && (grid!.style.backgroundColor = '#00b159');
  }

  // populates the modal with the grid
  function Range() { 
    let gridCollection: {pocket: string[],suited: string[], unsuited: string[] } = {
      pocket: [],
      suited: [], 
      unsuited: [] 
    };
    let colorOfGrid = ""
    let valueOfGrid = ""
    return <>{ranks.map((rank1,i) => {
      let rangeCol = ranks.map((rank2,j) => {
      if(rank2 == rank1) {
        gridCollection.pocket.push(rank2 + rank1) 
        colorOfGrid = '#00aedb'
        valueOfGrid = 'pocket'
      }else if(gridCollection.suited.includes(rank2 + rank1)) {
        gridCollection.unsuited.push(rank2 + rank1) 
        colorOfGrid = '#f37735'
        valueOfGrid = 'unsuited'
      }else {
        gridCollection.suited.push(rank1 + rank2)  
        colorOfGrid = '#00b159'
        valueOfGrid = 'suited'
      }
        return <GridItem key={`range_${i}_${j}`} rowSpan={1} colSpan={1}><Box key={`grid_row_${i}_col_${j}`} id={`grid_row_${i}_col_${j}`} onMouseDown={addRank} onMouseOver={mouseOverHandler} userSelect="none" width={7} height={7} backgroundColor={colorOfGrid} className={valueOfGrid} border='solid 1px' borderRadius="4px" margin="1px">{gridCollection.suited.includes(rank2 + rank1) ? (rank2 + rank1) : (rank1+rank2)}</Box></GridItem>
      })

      // console.log(gridCollection)
      return(<Grid key={`range_${i}_collection`} onContextMenu={(e)=> e.preventDefault()} textAlign="center" fontStyle="Bold" fontWeight="600" display="flex" justifyContent="center" templateRows={'repeat(1, 1fr)'} templateColumns={'repeat(13, 1fr)'}>{rangeCol}</Grid>);
    })}</>
  }
  
  // console.log(Range())
  function resetModal() {
    for(let i = 0; i <= 12; i++) {
      for(let j = 0; j <= 12; j++) {
        gridColorHandler(document.getElementById(`grid_row_${i}_col_${j}`))
      }
    }

    setRange({
      pocket: [],
      suited: [],
      unsuited: []
    })
    passedRange.current.value = range
  }
  
  function modalOpen() {
    console.log(passedRange.current)
    setRange({
      pocket: passedRange.current.value.pocket,
      suited: passedRange.current.value.suited,
      unsuited: passedRange.current.value.unsuited
    })
    setTimeout(() => {
      for(let i = 0; i <= 12; i++) {
        for(let j = 0; j <= 12; j++) {
          for(let k = 0;k < passedRange.current.value.pocket.length; k++) {
            document.getElementById(`grid_row_${i}_col_${j}`)!.textContent == passedRange.current.value.pocket[k] && (document.getElementById(`grid_row_${i}_col_${j}`)!.style.backgroundColor = 'red');
          }
          for(let l = 0;l < passedRange.current.value.suited.length; l++) {
            (document.getElementById(`grid_row_${i}_col_${j}`)!.textContent == passedRange.current.value.suited[l] && document.getElementById(`grid_row_${i}_col_${j}`)!.className.split(" ")[0] == "suited") && (document.getElementById(`grid_row_${i}_col_${j}`)!.style.backgroundColor = 'red');    
          }
          for(let m = 0;m < passedRange.current.value.unsuited.length; m++) {
            (document.getElementById(`grid_row_${i}_col_${j}`)!.textContent == passedRange.current.value.unsuited[m] && document.getElementById(`grid_row_${i}_col_${j}`)!.className.split(" ")[0] == "unsuited") && (document.getElementById(`grid_row_${i}_col_${j}`)!.style.backgroundColor = 'red');
          }
        }
      }
      // console.log(range)
    }, 1)
  }

  let rangeRef = useRef<any>(range)

  useEffect(() => {
    rangeRef.current = range
  },[range])

  function modalClose() {
    // console.log(rangeRef)
    passedRange.current.value = rangeRef.current
    // console.log(passedRange)
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
            <Box w={[300]} h={[400]}>
              <Range />
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={() => {
              onClose()
              modalClose()
            }}>
              Close
            </Button>
            <Button variant='ghost' onClick={resetModal}>Reset</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )

}

export default RangeModal;