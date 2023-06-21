import { Box, Heading, Icon, Text } from "@chakra-ui/react";
import React from "react";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import { useNavigate } from "react-router-dom";

function SelectSpot() {
  const navigate = useNavigate();

    const handleSpot = () => {
        navigate("/booking");
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

      <Box marginTop="3rem" display="flex" gap="1rem">
        <Box
          bg="white"
          width="60px"
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          padding="5px"
          borderRadius="5px"
          cursor="pointer"
          onClick={handleSpot}
        >
          <Icon fontSize="40px" color="red">
            <LocalParkingIcon />
          </Icon>
          <Text fontSize="sm" fontWeight="600">
            Slot 1
          </Text>
        </Box>

        <Box
          bg="white"
          width="60px"
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          padding="5px"
          borderRadius="5px"
          cursor="pointer"
          onClick={handleSpot}
        >
          <Icon fontSize="40px" color="red">
            <LocalParkingIcon />
          </Icon>
          <Text fontSize="sm" fontWeight="600">
            Slot 2
          </Text>
        </Box>

      </Box>

    </Box>
  );
}

export default SelectSpot;
