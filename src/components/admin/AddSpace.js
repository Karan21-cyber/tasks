import React, { useEffect, useState } from 'react'
import { Box, Button, FormControl, FormLabel, Heading, Input, Select, Text, useStatStyles } from "@chakra-ui/react";
import axios from 'axios';

function AddSpace() {

  const [locations, setLocations] = useState([]);

  const fetchlocations = async () => {
    const url = "http://localhost:5000/api/location/";
    const data = await axios.get(url);
    setLocations(data.data);
  };

   useEffect(() => {
     fetchlocations();
   }, []);

  return (
    <Box display="flex" flexDirection="column" gap="2rem" width="100%">
      <Heading
        bg="gray.800"
        color="white"
        marginLeft="1px"
        width="100"
        paddingBlock="1rem"
        textAlign="center"
      >
        Add Spaces
      </Heading>

      <Box display="flex" justifyContent="center">
        <Box
          width="500px"
          boxShadow="1px 1px 10px 1px"
          borderRadius="5px"
          padding="1rem"
        >
          <Text
            textAlign="center"
            bg="gray.300"
            fontSize="20px"
            fontWeight="600"
            color="green.400"
            paddingBlock="10px"
          >
            Add New Space
          </Text>

          <FormControl marginTop="10px">
            <FormLabel fontSize="15px" fontWeight="400">
              Location Name
            </FormLabel>
            <Select placeholder="Choose Location Name">
              {locations.map((data, index) => (
                <option value="option1" key={index}>{data.locationName}</option>
              ))}
            </Select>
          </FormControl>

          <FormControl marginTop="10px">
            <FormLabel fontSize="15px" fontWeight="400">
              Space Name
            </FormLabel>
            <Input placeholder="Space Name" type="email" />
          </FormControl>

          <FormControl marginTop="10px">
            <FormLabel fontSize="15px" fontWeight="400">
              No of Slots
            </FormLabel>
            <Input placeholder="No of Slots" type="number" />
          </FormControl>

          <FormControl marginTop="10px">
            <FormLabel fontSize="15px" fontWeight="400">
              Price Per Slot
            </FormLabel>
            <Input placeholder="Price Per Slot" type="number" />
          </FormControl>

          <Button marginBlock="1rem" color="white" bg="green.400">
            Add Spaces
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default AddSpace