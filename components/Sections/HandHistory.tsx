import { Box, Button, Grid, GridItem, Heading, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Textarea, useDisclosure } from "@chakra-ui/react";
import { useState } from 'react';

function HandHistory() {

  const { isOpen, onOpen, onClose } = useDisclosure()
  const [villainInfo, setVillainInfo] = useState('');

  function villainInfoHandler(e: any) {
    setVillainInfo(e.target.value);
  }


  return <Box display='flex' flexDirection='column'>
    <Box mb='50px'>
      <Heading textAlign='center' size='md' mb='5px'>Hand Title</Heading>
      <Textarea spellCheck='false' minH='100px' resize='none' placeholder='Input hand title here.' textAlign='center'></Textarea>
    </Box>
    <Heading textAlign='center' size='md' mb='5px'>Villian Info</Heading>
      <Button onClick={onOpen}>Open Modal</Button>
      <Modal size='xl' isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Villain Info</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Textarea id='villain_info' spellCheck='false' w='500px' h='500px' resize='none' onChange={villainInfoHandler}>{villainInfo}</Textarea>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
  </Box>

}

export default HandHistory;