import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ParkingState } from "../contextProvider/ParkingProvider";
import axios from "axios";

function Booking() {
  const [vehicalNo, setVehicalNo] = useState();
  const [entryTime, setEntryTime] = useState();
  const [entryDate, setEntryDate] = useState();
  const [hours, setHours] = useState(0);
  const [amount, setAmount] = useState(0.0);

  const navigate = useNavigate();
  const toast = useToast();
  const {user,selectedLocation, selectedSlot, selectedSpace } = ParkingState();

  const handleSubmit = async () => {
    if (!vehicalNo || !entryDate || !entryTime || !hours) {
      toast({
        title: "All Fields are required",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    // navigate("/payment");
    console.log(vehicalNo, entryDate, entryTime, hours, amount);
    const url = "http://localhost:5000/api/reserve/addreserve";
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const data = await axios.post(
      url,
      {
        user:user._id,
        location: selectedLocation._id,
        space: selectedSpace._id,
        slotNo: selectedSlot,
        vehicalNo,
        entryDate,
        entryTime,
        hours,
      },
      config
    );

    if (data) {
      toast({
        title: "Proceed to Payment",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

      navigate("/bill");
    }
  };

  const totalAmount = () => {
    const price = selectedSpace.price;

    if (hours === null) {
      setAmount(0.0);
    } else {
      var totalAmount = Number(hours) * Number(price);
      setAmount(totalAmount);
    }
  };

  useEffect(() => {
    totalAmount();
  }, [hours]);

  return (
    <Box bg="gray" paddingBlock="1rem" height="90vh">
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <Heading
          borderBottom="2px solid "
          marginBlock="1rem"
          color="whiteAlpha.800"
          fontWeight="600"
        >
          Book Parking Form
        </Heading>

        <Box
          bg="white"
          width="600px"
          padding="1rem"
          display="flex"
          flexDirection="column"
          gap="1rem"
          borderRadius="5px"
          opacity="0.9"
        >
          <Flex>
            <Text width="120px">Location </Text>
            <Text color="red">{selectedLocation.locationName}</Text>
          </Flex>

          <Flex>
            <Text width="120px">Parking Space </Text>
            <Text color="red">{selectedSpace.spaceName}</Text>
          </Flex>
          <Flex>
            <Text width="120px">Slot </Text>
            <Text color="red">{selectedSlot}</Text>
          </Flex>

          <Flex alignItems="center">
            <Text width="120px">Vehical No. </Text>
            <Input
              placeholder="Vehical Number"
              onChange={(e) => setVehicalNo(e.target.value)}
            />
          </Flex>

          <Flex alignItems="center">
            <Text width="120px">Entry Date </Text>
            <Input type="date" onChange={(e) => setEntryDate(e.target.value)} />
          </Flex>

          <Flex alignItems="center">
            <Text width="120px">Entry Time </Text>
            <Input type="time" onChange={(e) => setEntryTime(e.target.value)} />
          </Flex>

          <Flex alignItems="center">
            <Text width="120px">Total Hours </Text>
            <Input
              type="number"
              placeholder="Enter hours"
              onChange={(e) => setHours(e.target.value)}
            />
          </Flex>

          <Flex alignItems="center">
            <Text width="120px">Total Amount </Text>
            <Text width="120px" color="red">
              $ {amount}{" "}
            </Text>
          </Flex>

          <Button
            marginBlock="1rem"
            color="white"
            bg="green.400"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default Booking;
