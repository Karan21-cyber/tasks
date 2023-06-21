import {Box, Flex, Heading, Icon, Text } from '@chakra-ui/react'
import React from 'react'
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useNavigate } from 'react-router-dom';

function FindParking() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/location/6845122654");
  }

  return (
    <Box bg="gray" paddingBlock="1rem" height="90vh" px="10%">
      <Heading
        marginBlock="10px"
        color="whiteAlpha.800"
        fontSize="25px"
        fontWeight="500"
        textDecoration="underline"
      >
        All Parking Locations
      </Heading>
      <Text fontSize="15px">
        These are all the available parking locations where your can book your
        parking spot.
      </Text>

      <Box marginTop="3rem">

        <Flex padding="1rem" width="250px" borderRadius="10px" bg="whiteAlpha.800" 
          onClick={handleClick}
        >
          <Icon fontSize="40px"
            color="red"
          >
            <LocationOnIcon />
          </Icon>
          <Box ml="3">
            <Text fontWeight="bold" color="blue">Segun Adebayo</Text>
            <Text fontSize="sm">UI Engineer</Text>
          </Box>
        </Flex>


      </Box>
    </Box>
  );
}

export default FindParking