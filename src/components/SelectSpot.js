import { Box, Heading, Icon, Text,  useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import { useNavigate, useParams } from "react-router-dom";
import { ParkingState } from "../contextProvider/ParkingProvider";
import axios from "axios";

function SelectSpot() {
  const [space, setSpace] = useState();
  const [reserve, setReserve] = useState([]);
  // const [locationId, setLocationId] = useState();
  // const [spaceId, setSpaceId] = useState();

  const boxes = [];
  const spaces = [];

  const params = useParams();
  const toast = useToast();
  const {user, setSelectedSlot } = ParkingState();

  const navigate = useNavigate();
  const id = params.spot_id;

  const fetchSlots = async () => {
    const url = `http://localhost:5000/api/space/single/${id}`;
    const data = await axios.get(url);
    if (data) {
      setSpace(data.data);
      const result = await axios.get(
        "http://localhost:5000/api/reserve/groupfetch",
        {
          params: { location: data.data.location[0]._id, space: data.data._id },
        }
      );
      if (result) {
        setReserve(result.data);
      }
    }
  };

  useEffect(() => {
    fetchSlots();
  }, []);

  var slots = 0;
  if (space) {
    slots = space.slots;
  }

  const handleSpot = async(spot) => {
    setSelectedSlot(spot);

    const url = "http://localhost:5000/api/booking/addbooking";
    const config = {
      headers:{
        "Content-Type":"application/json",
      },
    };
    
    const data = await axios.post(url,{user:user._id,location:space.location[0]._id,space:space._id,slotNo:spot},config);
    
    localStorage.removeItem("location");
    localStorage.removeItem("space");
    localStorage.removeItem("slotNo");
    
    localStorage.setItem("location", JSON.stringify(space.location[0]));
    localStorage.setItem("space", JSON.stringify(space));
    localStorage.setItem("slotNo",spot);

    if(data)
    {
      toast({
        title:"Success data inserted successfully",
        status:"success",
        duration:5000,
        isClosable:true,
        position:"bottom"
      })
    }
    navigate("/booking");
  };

  const storeSpace = () => {
    for (let i = 0; i < reserve.length; i++) {
      spaces.push(reserve[i].slotNo);
    }
  };

  storeSpace();

  const displaySlots = () => {
    for (let i = 1; i <= slots; i++) {
      boxes.push(i);
    }
  };

  const isSlotReserve = async (spot) => {
    for (let i = 0; i < spaces.length; i++) {
      if (spaces[i] === spot) {
        return true;
      } else {
        return false;
      }
    }
  };

  return (
    <Box bg="gray" paddingBlock="2rem" px="10%">
      <Heading
        marginBlock="10px"
        color="whiteAlpha.800"
        fontSize="25px"
        fontWeight="500"
        textDecoration="underline"
      >
        All Parking Locations
      </Heading>
      <Text fontSize="15px">
        These are all the available parking locations where your can book your
        parking spot.
      </Text>

      <Box marginTop="3rem" display="flex" gap="1rem" flexWrap="wrap">
        {displaySlots()}

        {boxes.map((spot) => (
          <div key={spot}>
            {isSlotReserve(spot) === true ? (
              <Box
                bg="green.400"
                width="80px"
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexDirection="column"
                padding="5px"
                borderRadius="5px"
              >
                <Icon fontSize="40px" color="red">
                  <LocalParkingIcon />
                </Icon>
                <Text fontSize="sm" fontWeight="600">
                  Slot {spot}
                </Text>
              </Box>
            ) : (
              <Box
                bg="white"
                width="80px"
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexDirection="column"
                padding="5px"
                borderRadius="5px"
                cursor="pointer"
                onClick={(e) => handleSpot(spot)}
              >
                <Icon fontSize="40px" color="red">
                  <LocalParkingIcon />
                </Icon>
                <Text fontSize="sm" fontWeight="600">
                  Slot {spot}
                </Text>
              </Box>
            )}
          </div>
        ))}
      </Box>
    </Box>
  );
}

export default SelectSpot;
