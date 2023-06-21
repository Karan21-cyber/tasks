import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";

function Booking() {
  const navigate = useNavigate();

    const handleSubmit = () => {
        navigate("/payment");
    }

  return (
    <Box bg="gray" paddingBlock="1rem" height="90vh">
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <Heading
          borderBottom="2px solid "
          marginBlock="1rem"
          color="whiteAlpha.800"
          fontWeight="600"
        >
          Book Parking Form
        </Heading>

        <Box
          bg="white"
          width="600px"
          padding="1rem"
          display="flex"
          flexDirection="column"
          gap="1rem"
          borderRadius="5px"
          opacity="0.9"
        >
          <Flex>
            <Text width="120px">Location </Text>
            <Text color="red">Civil Mall</Text>
          </Flex>

          <Flex>
            <Text width="120px">Parking Space </Text>
            <Text color="red">Basement</Text>
          </Flex>
          <Flex>
            <Text width="120px">Slot </Text>
            <Text color="red">21</Text>
          </Flex>

          <Flex alignItems="center">
            <Text width="120px">Vehical No. </Text>
            <Input placeholder="Vehical Number" />
          </Flex>

          <Flex alignItems="center">
            <Text width="120px">Entry Date </Text>
            <Input type="date" />
          </Flex>

          <Flex alignItems="center">
            <Text width="120px">Entry Time </Text>
            <Input type="time" />
          </Flex>

          <Flex alignItems="center">
            <Text width="120px">Total Hours </Text>
            <Input type="number" placeholder="Enter hours" />
          </Flex>


          <Button marginBlock="1rem" color="white" bg="green.400"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default Booking;
