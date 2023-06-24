import { Box, Heading, Icon, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import { useNavigate } from "react-router-dom";
import { ParkingState } from "../contextProvider/ParkingProvider";
import axios from "axios";

function SelectSpot() {

  const [reserve, setReserve] = useState(false);
  const [locationId, setLocationId] = useState();
  const [spaceId, setSpaceId] = useState();

  const boxes = [];
  const { setSelectedSlot, selectedSpace, selectedLocation } = ParkingState();
  const slots = selectedSpace.slots;

  const navigate = useNavigate();

// const isSlotReserve = async (spot) => {
//   try {
//     const data = await axios.get(
//       "http://localhost:5000/api/reserve/singlefetch",
//       {
//         params: {
//           location: selectedLocation._id,
//           space: selectedSpace._id,
//           slotNo: spot,
//         },
//       }
//     );

//     if (data && data.status === 200) {
//       // console.log(data);
//       setReserve(true);
//     } else {
//       setReserve(false);
//     }
//   } catch (error) {
//     // Handle any error that occurred during the request
//     // console.error(error);
//     return false;
//   }
// };


  const handleSpot = (spot) => {
    setSelectedSlot(spot);
    navigate("/booking");
  };

  const displaySlots = () => {
    for (let i = 1; i <= slots; i++) {
      boxes.push(i);
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

        {boxes.map((spot) =>
          // isSlotReserve(spot)  ? (
            // <>
            
              <Box
                key={spot}
                bg="green.400"
                width="60px"
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
            // </>
          // ) : (
          //   <>
          //     <Box
          //       key={spot}
          //       bg="white"
          //       width="60px"
          //       display="flex"
          //       justifyContent="center"
          //       alignItems="center"
          //       flexDirection="column"
          //       padding="5px"
          //       borderRadius="5px"
          //       cursor="pointer"
          //     >
          //       <Icon fontSize="40px" color="red">
          //         <LocalParkingIcon />
          //       </Icon>
          //       <Text fontSize="sm" fontWeight="600">
          //         Slot {spot}
          //       </Text>
          //     </Box>
          //   </>
          // )
        )}
      </Box>
    </Box>
  );
}

export default SelectSpot;
