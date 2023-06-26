import React, { useEffect, useState } from "react";
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
import { ParkingState } from "../../contextProvider/ParkingProvider";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function EditLocation() {
  const [locationId, setLocationId] = useState();
  const [locationName, setLocationsName] = useState();
  const [phone, setPhone] = useState();
  const [address, setAddress] = useState();

  const params = useParams();

  const toast = useToast();
  const navigate = useNavigate();

  const singleLocation = async () => {
    const locationId = params.id;

    const data = await axios.get(
      `http://localhost:5000/api/location/single/${locationId}`
    );

    if (data) {
      setLocationId(data.data._id);
      setLocationsName(data.data.locationName);
      setPhone(data.data.phone);
      setAddress(data.data.address);
    }
  };

  useEffect(() => {
    singleLocation();
  }, []);

  const handleUpdate = async () => {
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
      const url = "http://localhost:5000/api/location/update";

      const data = await axios.put(url, {
        locationId,
        locationName,
        phone,
        address,
      });

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
        Edit Location
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
            Edit New Loaction
          </Text>

          <Input
            value={locationId}
            placeholder="locationId"
            type="hidden"
            onChange={(e) => setLocationId(e.target.value)}
          />

          <FormControl marginTop="10px">
            <FormLabel fontSize="15px" fontWeight="400">
              Location Name
            </FormLabel>
            <Input
              value={locationName}
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
              value={address}
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
              value={phone}
              placeholder="Phone Number"
              type="number"
              onChange={(e) => setPhone(e.target.value)}
            />
          </FormControl>

          <Button
            marginBlock="1rem"
            color="white"
            bg="green.400"
            onClick={handleUpdate}
          >
            Edit Location
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default EditLocation;
