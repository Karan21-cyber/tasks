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
import { ParkingState } from "../contextProvider/ParkingProvider";
import axios from "axios";

function Booking() {
  const [locationId,setLocationId] = useState();
  const [spaceId, setSpaceId] = useState();
  const [locationName, setLocationName] = useState();
  const [spaceName, setSpaceName] = useState();
  
  const [spot, setSpot] = useState();
  const [price , setPrice] = useState();
  const [booking ,setBooking] = useState();

  const [vehicalNo, setVehicalNo] = useState();
  const [entryTime, setEntryTime] = useState();
  const [entryDate, setEntryDate] = useState();
  const [hours, setHours] = useState(0);
  const [amount,setAmount] = useState(0);

  const toast = useToast();

  const {user } = ParkingState();

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

  const bookingId = localStorage.getItem("booking");

  const url = "http://localhost:5000/api/reserve/addreserve";
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const  data  = await axios.post(
      url,
      {
        booking: bookingId,
        user: user._id,
        location: locationId,
        space: spaceId,
        slotNo: spot,
        vehicalNo,
        entryDate,
        entryTime,
        hours,
        amount,
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
    }
  } catch (error) {
    toast({
      title: "Error",
      description: "Unable to reserve slots",
      status: "error",
      duration: 5000,
      isClosable: true,
      position: "bottom",
    });
  }
};



  const fetchBooking = async() => {
    const users = JSON.parse(localStorage.getItem("userInfo"));
     const locations = JSON.parse(localStorage.getItem("location"));
     const spaces = JSON.parse(localStorage.getItem("space"));
     const spot = localStorage.getItem("slotNo");
     
     setLocationId(locations._id);
     setSpaceId(spaces._id);
     setLocationName(locations.locationName);
     setSpaceName(spaces.spaceName);
     setSpot(spot);
     setPrice(spaces.price);

    const singledata = await axios.get(
      "http://localhost:5000/api/booking/singlebooking",
      {
        params:{
          user: users._id,
          location: locations._id,
          space: spaces._id,
          slotNo: spot,
      },
    }
    );
      
    if(singledata){
      setBooking(singledata.data);
    }
  }

  if(booking){
    localStorage.removeItem("booking");
    localStorage.setItem("booking", booking._id);
  }

  useEffect(() => {
    fetchBooking();
  },[]);


    const totalAmount = () => {
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

  const sandbox = true;
  const paypaUrl = sandbox === true ? "https://www.sandbox.paypal.com/cgi-bin/webscr" : "https://www.paypal.com/cgi-bin/webscr";
  const paypalId = "sb-zyvay25739447@business.example.com";
  const cancelUrl = "http://localhost:3000/";
  const returnUrl = "http://localhost:3000/success";
  const currency = "USD";

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
            <Text color="red">{locationName}</Text>
          </Flex>

          <Flex>
            <Text width="120px">Parking Space </Text>
            <Text color="red">{spaceName}</Text>
          </Flex>
          <Flex>
            <Text width="120px">Slot </Text>
            <Text color="red">{spot}</Text>
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

          {!vehicalNo || !entryDate || !entryTime || !hours ? (
            <Button disabled>Payment By Paypal</Button>
          ) : (
            <form action={paypaUrl} method="post">
              <div>
                <input type="hidden" name="business" value={paypalId} />

                <input type="hidden" name="amount" value={amount} />

                <input type="hidden" name="currency_code" value={currency} />

                <input type="hidden" name="cmd" value="_xclick" />

                <input type="hidden" name="return" value={returnUrl} />
                <input type="hidden" name="cancel_return" value={cancelUrl} />
                <input
                  className="paypal-btn"
                  type="submit"
                  name="submit"
                  value="Payment By Paypal"
                  onClick={handleSubmit}
                />
              </div>
            </form>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default Booking;
