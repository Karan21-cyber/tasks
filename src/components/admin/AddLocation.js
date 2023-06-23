import React from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
} from "@chakra-ui/react";

function AddLocation() {
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
        Add Location
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
            Add New Loaction
          </Text>

          <FormControl marginTop="10px">
            <FormLabel fontSize="15px" fontWeight="400">
              Location Name
            </FormLabel>
           <Input placeholder="Location Name" type="text" />

          </FormControl>

          <FormControl marginTop="10px">
            <FormLabel fontSize="15px" fontWeight="400">
              Address
            </FormLabel>
            <Input placeholder="Address" type="text" />
          </FormControl>

          <FormControl marginTop="10px">
            <FormLabel fontSize="15px" fontWeight="400">
              Phone Number
            </FormLabel>
            <Input placeholder="Phone Number" type="number" />
          </FormControl>


          <Button marginBlock="1rem" color="white" bg="green.400">
            Add Location
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default AddLocation;
