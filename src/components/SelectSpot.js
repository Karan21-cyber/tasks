import { Box, Heading, Icon, Text, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import { useNavigate, useParams } from "react-router-dom";
import { ParkingState } from "../contextProvider/ParkingProvider";
import axios from "axios";

function SelectSpot() {
  const [space, setSpace] = useState();
  const [reserve, setReserve] = useState([]);
  const [loading,setLoading] = useState(false);

  const boxes = [];
  const spaces = [];

  const params = useParams();
  const toast = useToast();
  const { user, setSelectedSlot } = ParkingState();

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

  const handleSpot = async (spot) => {
    setSelectedSlot(spot);

    const url = "http://localhost:5000/api/booking/addbooking";
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const data = await axios.post(
      url,
      {
        user: user._id,
        location: space.location[0]._id,
        space: space._id,
        slotNo: spot,
      },
      config
    );

    localStorage.removeItem("location");
    localStorage.removeItem("space");
    localStorage.removeItem("slotNo");

    localStorage.setItem("location", JSON.stringify(space.location[0]));
    localStorage.setItem("space", JSON.stringify(space));
    localStorage.setItem("slotNo", spot);

    navigate("/booking");
  };

  const removeReserve = () => {
    reserve.map(async (data) => {
      var bookingId = data.booking;
      var reserve_id = data._id;
      var entryDate = data.entryDate;
      var entryTime = data.entryTime;
      var hours = data.hours;

      var time = entryDate + "T" + entryTime;
      var timestamp = Date.parse(time);
      var prev_date = new Date(timestamp);
      prev_date.setHours(prev_date.getHours() + Number(hours));

      // new date
      var currentDate = new Date();

      if (currentDate >= prev_date) {
        const reserveRemove = await axios.delete(
          `http://localhost:5000/api/reserve/remove/${reserve_id}`
        );
        const deletebooking = await axios.delete(
          `http://localhost:5000/api/booking/removebooking/${bookingId}`
        );
        if (reserveRemove && deletebooking) {
          console.log("success");
          setLoading(true);
        } else {
          console.log("failure");
        }
      } else {
        console.log("no data found");
      }
    });
  };

  const storeSpace = () => {
    for (let i = 0; i < reserve.length; i++) {
      spaces.push(reserve[i].slotNo);
    }
  };

  removeReserve();
  storeSpace();

  const displaySlots = () => {
    for (let i = 1; i <= slots; i++) {
      boxes.push(i);
    }
  };

  const findslot = (slot) => {
    const result = spaces.includes(slot);
    if (result) {
      return true;
    } else {
      return false;
    }
  };

 
  if(loading){
    window.location.reload();
    setLoading(false);
  }
 
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
            {findslot(spot) ? (
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
