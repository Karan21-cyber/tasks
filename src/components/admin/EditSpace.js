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
  space,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function EditSpace() {
  const [spaceId, setSpaceId] = useState();
  const [locationId, setLocationId] = useState();
  const [locationName, setLocationsName] = useState();
  const [spaceName, setSpaceName] = useState();
  const [slots, setSlot] = useState();
  const [price, setPrice] = useState();

  const toast = useToast();
  const navigate = useNavigate();
  const params = useParams();

  const singleSpace = async () => {
    const spaceId = params.id;

    const data = await axios.get(
      `http://localhost:5000/api/space/single/${spaceId}`
    );

    if (data) {
      setSpaceId(data.data._id);
      setSpaceName(data.data.spaceName);
      setLocationId(data.data.location[0]._id);
      setLocationsName(data.data.location[0].locationName);
      setSlot(data.data.slots);
      setPrice(data.data.price);
    }
  };

  useEffect(() => {
    singleSpace();
  }, []);

  const handleUpdate = async () => {
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

    const url = "http://localhost:5000/api/space/update";

    const data = await axios.put(url, {
      spaceId,
      location: locationId,
      spaceName,
      slots,
      price,
    });

    if (data) {
      toast({
        title: "Space Update Successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

      navigate("/spaces");
    } else {
      toast({
        title: "Update Failed",
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
        Edit Spaces
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
            Edit New Space
          </Text>

          <Input
            placeholder="spaceId"
            type="hidden"
            value={spaceId}
            onChange={(e) => setSpaceId(e.target.value)}
          />
          <FormControl marginTop="10px">
            <FormLabel fontSize="15px" fontWeight="400">
              Location Name
            </FormLabel>
            <Select onChange={(e) => setLocationId(e.target.value)}>
              <option value={locationId}>{locationName}</option>
            </Select>
          </FormControl>

          <FormControl marginTop="10px">
            <FormLabel fontSize="15px" fontWeight="400">
              Space Name
            </FormLabel>
            <Input
              placeholder="Space Name"
              type="text"
              value={spaceName}
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
              value={slots}
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
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </FormControl>

          <Button
            marginBlock="1rem"
            color="white"
            bg="green.400"
            onClick={handleUpdate}
          >
            Edit Spaces
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default EditSpace;
