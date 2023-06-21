import { ViewIcon } from '@chakra-ui/icons';
import { Button, IconButton, Modal, Text, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure ,Image} from '@chakra-ui/react'
import React from 'react'

function Profile({user,children}) {
    const {isOpen ,onOpen, onClose} = useDisclosure();

    const username = user.firstname + " " + user.lastname;

  return (
    <>
      {children ? (
        <span onClick={onOpen}>{children}</span>
      ) : (
        <IconButton d={{ base: "flex" }} icon={<ViewIcon />} onClick={onOpen} />
      )}

      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader className='profile-title'>
            {username}
          </ModalHeader>
          <ModalCloseButton />

          <ModalBody className='profile-info'>
            <Image
              borderRadius="full"
              boxSize="150px"
              src={user.picture}
              alt={username}
            />
            <Text
              fontSize={{ base: "20px", md: "25px" }}
              fontFamily="Work sans"
            >
              Email :{user.email}
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default Profile