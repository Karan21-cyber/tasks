import React, { useState } from "react";
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
import { ParkingState } from "../../contextProvider/ParkingProvider";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function EditSpace() {

  const [spaceId,setSpaceId] = useState();
  const [locationId, setLocationId] = useState();
  const [spaceName, setSpaceName] = useState();
  const [slots, setSlot] = useState();
  const [price, setPrice] = useState();

  const {selectedSpace} = ParkingState();
const toast = useToast();
const navigate = useNavigate();

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

    const url = "http://localhost:5000/api/space/addspace";

    const data = await axios.put(
      url,
      {spaceId, location: locationId, spaceName, slots, price }
    );

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
            value={selectedSpace._id}
            onChange={(e) => setSpaceId(e.target.value)}
          />
          <FormControl marginTop="10px">
            <FormLabel fontSize="15px" fontWeight="400">
              Location Name
            </FormLabel>
            <Select onChange={(e) => setLocationId(e.target.value)}>
              <option value={selectedSpace.location[0]._id}>
                {selectedSpace.location[0].locationName}
              </option>
            </Select>
          </FormControl>

          <FormControl marginTop="10px">
            <FormLabel fontSize="15px" fontWeight="400">
              Space Name
            </FormLabel>
            <Input
              placeholder="Space Name"
              type="text"
              value={selectedSpace.spaceName}
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
              value={selectedSpace.slots}
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
              value={selectedSpace.price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </FormControl>

          <Button marginBlock="1rem" color="white" bg="green.400"
          onClick={handleUpdate}>
            Edit Spaces
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default EditSpace;
