import React, { useEffect, useState } from "react";
import { Box, Button, Flex, Heading, Text, useToast } from "@chakra-ui/react";
import { useNavigate} from "react-router-dom";
import { ParkingState } from "../contextProvider/ParkingProvider";
import axios from "axios";

function Completion() {

  const [reserve, setReserve] = useState();
  const [location, setLocation] = useState();
  const [space, setSpace] = useState();
  const [success ,setSuccess] = useState(false);
  
  const navigate = useNavigate();

  const toast = useToast();

  const {user} = ParkingState();

  const fetchReserve = async () => {

    const bookingId = localStorage.getItem('booking');
    const url = "http://localhost:5000/api/reserve/singlefetch";

    const data = await axios.get(url,
      {
        params:
        {
          booking:bookingId}
        }
        );

    if(data){
      setReserve(data.data);
      setLocation(data.data.location[0]);
      setSpace(data.data.space[0]);

       const inserturl = "http://localhost:5000/api/payment/addpayment";
       const config = {
         headers: {
           "Content-Type": "application/json",
         },
       };
       
       const payment = await axios.post(
         inserturl,
         {
           user: data.data.user[0]._id,
           location: data.data.location[0]._id,
           space: data.data.space[0]._id,
           reserve: data.data._id,
           slotNo: data.data.slotNo,
           vehicalNo: data.data.vehicalNo,
           entryDate: data.data.entryDate,
           totalHrs: data.data.hours,
           amount: data.data.amount,
         },
         config
       );

       if (payment) {
        setSuccess(true);
         toast({
           title: "Success payment",
           status: "success",
           duration: 5000,
           isClosable: true,
           position: "bottom",
         });
       }
    }
  };

  useEffect(() => {
    fetchReserve();
  }, []);

  if(reserve && location && space && success) {
    return (
       <Box
      bg="gray.400"
      height="90vh"
      display="flex"
      justifyContent="center"
      // alignItems="center"
    >
      <Box
        width="500px"
        marginTop="2rem"
        boxShadow="1px 2px 10px 1px"
        bg="whiteAlpha.800"
        paddingLeft="2rem"
        borderRadius="5px"
        height="80vh"
      >
        <Heading
          textAlign="center"
          fontSize="25px"
          textDecoration="underline"
          paddingTop="1rem"
        >
          Invoice Receipt
        </Heading>

        <Box marginTop="2rem">
              <Flex gap="1rem" marginTop="1rem">
                <Text>Customer Name</Text>:
                <Text color="red.600">{user.name}</Text>
              </Flex>

              <Flex gap="1rem" marginTop="1rem">
                <Text>Contact No</Text>:
                <Text color="red.600">{user.phone}</Text>
              </Flex>

              <Flex gap="1rem" marginTop="1rem">
                <Text>Parking Location</Text>:
                <Text color="red.600">{location.locationName}</Text>
              </Flex>

              <Flex gap="1rem" marginTop="1rem">
                <Text>Parking Space</Text>:
                <Text color="red.600">{space.spaceName}</Text>
              </Flex>

              <Flex gap="1rem" marginTop="1rem">
                <Text>Slot No </Text>:
                <Text color="red.600">{reserve.slotNo}</Text>
              </Flex>

              <Flex gap="1rem" marginTop="1rem">
                <Text>Vehical No </Text>:
                <Text color="red.600">{reserve.vehicalNo}</Text>
              </Flex>

              <Flex gap="1rem" marginTop="1rem">
                <Text>Entry Date</Text>:
                <Text color="red.600">{reserve.entryDate}</Text>
              </Flex>

              <Flex gap="1rem" marginTop="1rem">
                <Text>Entry Time</Text>:
                <Text color="red.600">{reserve.entryTime}</Text>
              </Flex>

              <Flex gap="1rem" marginTop="1rem">
                <Text>Total Hours</Text>:
                <Text color="red.600">{reserve.hours} hour</Text>
              </Flex>

              <Flex gap="1rem" marginTop="1rem">
                <Text>Total Amount</Text>:
                <Text color="red.600">$ {reserve.amount}</Text>
              </Flex>

              <Button
                marginTop="2rem"
                bg="gray.700"
                color="green.300"
                onClick={() => navigate("/")}
              >
                Return to home
              </Button>

        </Box>
      </Box>
    </Box>
    )
  }

}

export default Completion;
