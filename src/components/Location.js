import { Box, Heading, Table,  TableContainer, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import {ParkingState} from "../contextProvider/ParkingProvider"
import axios from "axios"

function Location() {

    const [spaces, setSpaces] = useState([]);

    const navigate = useNavigate();
    const params = useParams();

    const { user, setSelectedSpace } = ParkingState();

    const fetchSpaces = async () => {
      const locationId = params.location_id;
      const url = `http://localhost:5000/api/space/group/${locationId}`;
      const data = await axios.get(url);
      setSpaces(data.data);
    };

    useEffect(() => {
      fetchSpaces();
    }, []);


    const handlebooking = (data, id) => {
        setSelectedSpace(data);
        navigate(`/selectlocation/${id}`)
    }


    




  return (
    <Box bg="gray" paddingBlock="1rem" height="90vh" px="10%">
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

      <Box marginTop="3rem">
        <TableContainer>
          <Table variant="simple">
            <Thead color="white" bg="blue.800">
              <Tr>
                <Th color="white">Id</Th>
                <Th color="white">Parking Location</Th>
                <Th color="white">Parking Space</Th>
                <Th color="white">Total Parking</Th>
                <Th color="white">Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {spaces.map((data, index) => (
                <Tr key={index}>
                  <Td>{index + 1}</Td>
                  <Td>{data.location[0].locationName}</Td>
                  <Td>{data.spaceName}</Td>
                  <Td>{data.slots}</Td>
                  <Td>
                    {user ? (
                      <Text
                        color="purple"
                        textDecoration="underline"
                        cursor="pointer"
                        onClick={(e) => handlebooking(data, data._id)}
                      >
                        Book Parking
                      </Text>
                    ) : (
                      <Text
                        color="purple"
                        textDecoration="underline"
                        cursor="pointer"
                        onClick={(e) => navigate("/login")}
                      >
                        Book Parking
                      </Text>
                    )}
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}

export default Location