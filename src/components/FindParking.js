import {Box, Flex, Heading, Icon, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useNavigate } from 'react-router-dom';
import { ParkingState } from '../contextProvider/ParkingProvider';
import axios from 'axios';

function FindParking() {

  const [locations, setLocations] = useState([]);

  const { setSelectedLocation } = ParkingState(); 

  const navigate = useNavigate();

  const handleClick = (id,data) => {
    setSelectedLocation(data);
    navigate(`/location/${id}`);
  }

    const fetchlocations = async () => {
      const url = "http://localhost:5000/api/location/";
      const data = await axios.get(url);
      setLocations(data.data);
    };


    useEffect(() => {
      fetchlocations();
    }, [navigate]);


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

      <Box marginTop="3rem" display="flex" flexWrap="wrap" gap="2rem">
        {locations.map((data, index) => (
          <Flex
            key={index}
            padding="1rem"
            width="250px"
            borderRadius="10px"
            bg="whiteAlpha.800"
            onClick={(e) => handleClick(data._id,data)}
          >
            <Icon fontSize="40px" color="red">
              <LocationOnIcon />
            </Icon>
            <Box ml="3">
              <Text fontWeight="bold" color="blue">
                {data.locationName}
              </Text>
              <Text fontSize="sm">{data.address}</Text>
            </Box>
          </Flex>
        ))}
        
      </Box>
    </Box>
  );
}

export default FindParking