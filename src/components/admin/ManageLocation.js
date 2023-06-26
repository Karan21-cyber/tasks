import {
  Box,
  Heading,
  Icon,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { ParkingState } from "../../contextProvider/ParkingProvider";
import axios from "axios";

function ManageLocation() {
  const [locations, setLocations] = useState([]);

  const navigate = useNavigate();
  const {setSelectedLocation} = ParkingState(); 
  
  const toast = useToast();

  const fetchlocations = async() => {
    const url = "http://localhost:5000/api/location/";
    const data = await axios.get(url);
    setLocations(data.data);
  }
  
  useEffect(() => {
    fetchlocations();
  },[]);

  const removeLocation = async(id) => {
    const url = `http://localhost:5000/api/location/remove/${id}`;
    const data = await axios.delete(url);

    if(data){
      toast({
        title:"Location is Successfully Deleted",
        status:"success",
        duration:5000,
        isClosable:true,
        position:"bottom"
      })
    }
    fetchlocations();
    navigate("/locations")
  }

  const updateLocation = (location) => {
    // setSelectedLocation(id);
    navigate(`/editlocation/${location._id}`);
  }
  
  return (
    <Box
      display="flex"
      flexDirection="column"
      gap="2rem"
      width="100%"
      height="100vh"
      overflowY="scroll"
    >
      <Heading
        bg="gray.800"
        color="white"
        marginLeft="1px"
        width="100"
        paddingBlock="1rem"
        textAlign="center"
      >
        Manage Locations
      </Heading>

      <Box marginLeft="1rem">
        <Heading
          color="gray"
          fontSize="20px"
          fontWeight="600"
          textDecor="underline"
          marginBottom="10px"
        >
          List of Locations
        </Heading>
        <Text>
          Here is the list of all the parking Locations where we can manage our
          Locations
        </Text>

        <Box marginTop="3rem" marginInline="20px">
          <TableContainer>
            <Table variant="simple">
              <Thead color="white" bg="blue.800">
                <Tr>
                  <Th color="white">Id</Th>
                  <Th color="white">Location Name</Th>
                  <Th color="white">Address</Th>
                  <Th color="white">Phone Number</Th>
                  <Th color="white">Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {locations.map((location, index) => (
                  <Tr key={index}>
                    <Td>{index + 1}</Td>
                    <Td>{location.locationName}</Td>
                    <Td>{location.address}</Td>
                    <Td>{location.phone}</Td>
                    <Td display="flex" gap="1rem">
                      <Icon
                        fontSize="20px"
                        color="green.400"
                        cursor="pointer"
                        onClick={(e) => updateLocation(location)}
                      >
                        <EditIcon />
                      </Icon>
                      <Icon
                        fontSize="20px"
                        color="red"
                        cursor="pointer"
                        onClick={(e) => removeLocation(location._id)}
                      >
                        <DeleteIcon />
                      </Icon>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Box>
  );
}

export default ManageLocation;
