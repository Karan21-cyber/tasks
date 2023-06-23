import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AddLocation() {
  const [locationName, setLocationsName] = useState();
  const [phone, setPhone] = useState();
  const [address, setAddress] = useState();

  const navigate = useNavigate();
  const toast = useToast();

  const handleSubmit = async () => {

    if (!locationName || !phone || !address) {
      toast({
        title: "Fill All fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    try {
      const url = "http://localhost:5000/api/location/addlocation";

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const data = await axios.post(
        url,
        {
          locationName,
          address,
          phone,
        },
        config
      );

      if (data) {
        toast({
          title: "Data update Successfully",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        navigate("/locations");
      }
    } catch (error) {
      return;
    }
  };

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
            <Input
              placeholder="Location Name"
              type="text"
              onChange={(e) => setLocationsName(e.target.value)}
            />
          </FormControl>

          <FormControl marginTop="10px">
            <FormLabel fontSize="15px" fontWeight="400">
              Address
            </FormLabel>
            <Input
              placeholder="Address"
              type="text"
              onChange={(e) => setAddress(e.target.value)}
            />
          </FormControl>

          <FormControl marginTop="10px">
            <FormLabel fontSize="15px" fontWeight="400">
              Phone Number
            </FormLabel>
            <Input
              placeholder="Phone Number"
              type="number"
              onChange={(e) => setPhone(e.target.value)}
            />
          </FormControl>

          <Button
            marginBlock="1rem"
            color="white"
            bg="green.400"
            onClick={handleSubmit}
          >
            Add Location
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default AddLocation;
