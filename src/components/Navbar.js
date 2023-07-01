import React from "react";
import {
  Avatar,
  Box,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { ParkingState } from "../contextProvider/ParkingProvider";

function Navbar() {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { user, setUser } = ParkingState();

  const logout = () => {
    localStorage.clear("userInfo");
    setUser();
    navigate("/");
  };

  return (
    <Box
      display="flex"
      bg="gray.600"
      height="10vh"
      justifyContent="space-between"
      paddingX={7}
      alignItems="center"
      position="sticky"
      top="0"
      zIndex="1"
    >
      <Text
        onClick={(e) => navigate("/")}
        color="white"
        fontSize="1.2rem"
        cursor="pointer"
      >
        Parking System
      </Text>

      <Box color="gray.300" display="flex" gap="1rem" fontSize="15px">
        <Link to="/">Home</Link>
        <Link to="/search">Find Parking</Link>
        {user ? (
          <>
            <Link to="/reports">Reports</Link>
            <Text onClick={logout} cursor="pointer">
              Logout
            </Text>

            <Avatar
              onClick={onOpen}
              cursor="pointer"
              size="sm"
              name="Dan Abrahmov"
              src="https://bit.ly/dan-abramov"
            />

            {/* model */}

            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Profile Information</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Box display="flex" justifyContent="center">
                    <Avatar
                      onClick={onOpen}
                      cursor="pointer"
                      size="2xl"
                      name="Dan Abrahmov"
                      src="https://bit.ly/dan-abramov"
                    />
                  </Box>
                  <Box
                    display="flex"
                    flexDirection="column"
                    gap="5px"
                    flex-wrap="wrap"
                  >
                    <Flex gap="1rem" marginTop="1rem">
                      <Text>Name</Text>:<Text color="red.600">{user.name}</Text>
                      <Text></Text>
                    </Flex>

                    <Flex gap="1rem" marginTop="1rem">
                      <Text>Email</Text>:
                      <Text color="red.600">{user.email}</Text>
                    </Flex>

                    <Flex gap="1rem" marginTop="1rem">
                      <Text>Phone Number</Text>:
                      <Text color="red.600">{user.phone}</Text>
                    </Flex>

                    <Flex gap="1rem" marginTop="1rem">
                      <Text>Address</Text>:
                      <Text color="red.600">{user.address}</Text>
                    </Flex>
                  </Box>
                </ModalBody>
              </ModalContent>
            </Modal>
          </>
        ) : (
          <>
            <Link to="/signup">Signup</Link>
            <Link to="/login">Login</Link>
          </>
        )}
      </Box>
    </Box>
  );
}

export default Navbar;
