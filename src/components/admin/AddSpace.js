import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  Text,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddSpace() {
  const [locations, setLocations] = useState([]);
  const [locationId, setLocationId] = useState();
  const [spaceName, setSpaceName] = useState();
  const [slots, setSlot] = useState();
  const [price, setPrice] = useState();

  const navigate = useNavigate();
  const toast = useToast();

  const fetchlocations = async () => {
    const url = "http://localhost:5000/api/location/";
    const data = await axios.get(url);
    setLocations(data.data);
  };

  useEffect(() => {
    fetchlocations();
  }, []);

  const handleSubmit = async () => {
    if (!locationId || !spaceName || !slots || !price) {
      toast({
        title: "All Fields are required",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    const url = "http://localhost:5000/api/space/addspace";
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const data = await axios.post(
      url,
      { location: locationId, spaceName, slots, price },
      config
    );

    if (data) {
      toast({
        title: "Space Added Successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

      navigate("/spaces");

    } else {
      toast({
        title: "Registration Failed",
        status: "warning",
        duration: 5000,
        isClosable: true,
        positon: "bottom",
      });
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
            <Select
              placeholder="Choose Location Name"
              onChange={(e) => setLocationId(e.target.value)}
            >
              {locations.map((data, index) => (
                <option value={data._id} key={index}>
                  {data.locationName}
                </option>
              ))}
            </Select>
          </FormControl>

          <FormControl marginTop="10px">
            <FormLabel fontSize="15px" fontWeight="400">
              Space Name
            </FormLabel>
            <Input
              placeholder="Space Name"
              type="text"
              onChange={(e) => setSpaceName(e.target.value)}
            />
          </FormControl>

          <FormControl marginTop="10px">
            <FormLabel fontSize="15px" fontWeight="400">
              No of Slots
            </FormLabel>
            <Input
              placeholder="No of Slots"
              type="number"
              onChange={(e) => setSlot(e.target.value)}
            />
          </FormControl>

          <FormControl marginTop="10px">
            <FormLabel fontSize="15px" fontWeight="400">
              Price Per Slot
            </FormLabel>
            <Input
              placeholder="Price Per Slot"
              type="number"
              onChange={(e) => setPrice(e.target.value)}
            />
          </FormControl>

          <Button
            marginBlock="1rem"
            color="white"
            bg="green.400"
            onClick={handleSubmit}
          >
            Add Spaces
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default AddSpace;
