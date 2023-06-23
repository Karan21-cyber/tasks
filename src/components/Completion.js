import React from 'react'
import {Box, Button, Flex, Heading, Text} from "@chakra-ui/react"
import {useNavigate} from "react-router-dom"

function Completion() {
  const navigate = useNavigate();

  return (
    <Box
      bg="gray.400"
      height="90vh"
      display="flex"
      justifyContent="center"
      // alignItems="center"
    >
      <Box width="500px" marginTop="2rem" boxShadow="1px 2px 10px 1px" bg="whiteAlpha.800" paddingLeft="2rem" borderRadius="5px" height="80vh" >
        
        <Heading textAlign="center" fontSize="25px" textDecoration="underline" paddingTop="1rem">
          Invoice Receipt
        </Heading>

        <Box marginTop="2rem">
          <Flex gap="1rem" marginTop="1rem">
            <Text>Customer Name</Text>:
            <Text color="red.600">Karan Chaudhary</Text>
          </Flex>

          <Flex gap="1rem" marginTop="1rem">
            <Text>Contact No</Text>:
            <Text color="red.600">9821479916</Text>
          </Flex>

          <Flex gap="1rem" marginTop="1rem">
            <Text>Parking Location</Text>:
            <Text color="red.600">Civil Mall</Text>
          </Flex>

          <Flex gap="1rem" marginTop="1rem">
            <Text>Parking Space</Text>:
            <Text color="red.600">Basement</Text>
          </Flex>

          <Flex gap="1rem" marginTop="1rem">
            <Text>Slot No </Text>:
            <Text color="red.600">11</Text>
          </Flex>

          <Flex gap="1rem" marginTop="1rem">
            <Text>Vehical No </Text>:
            <Text color="red.600">2121</Text>
          </Flex>

          <Flex gap="1rem" marginTop="1rem">
            <Text>Entry Date</Text>:
            <Text color="red.600">21/21-2020</Text>
          </Flex>

          <Flex gap="1rem" marginTop="1rem">
            <Text>Entry Time</Text>:
            <Text color="red.600">5:50</Text>
          </Flex>

          <Flex gap="1rem" marginTop="1rem">
            <Text>Total Hours</Text>:
            <Text color="red.600">10hrs</Text>
          </Flex>

          <Flex gap="1rem" marginTop="1rem">
            <Text>Total Amount</Text>:
            <Text color="red.600">$ 1000</Text>
          </Flex>

          <Button marginTop="2rem"
            bg="gray.700"
            color="green.300"
            onClick={() => navigate("/")}
          >
            Return to home
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default Completion