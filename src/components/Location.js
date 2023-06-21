import { Box, Heading, Table,  TableContainer, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react'
import React from 'react'
import { useNavigate } from 'react-router-dom';


function Location() {

    const navigate = useNavigate();

    const handlebooking = () => {
        navigate("/selectlocation/:4643121")
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
                <Th color="white">Vacant Parking</Th>
                <Th color="white">Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>inches</Td>
                <Td>millimetres (mm)</Td>
                <Td>inches</Td>
                <Td>millimetres (mm)</Td>
                <Td>inches</Td>
                <Td><Text color="purple" 
                    textDecoration="underline"
                    cursor="pointer"
                    onClick={handlebooking}
                >Book Parking</Text></Td>
              </Tr>

              <Tr>
                <Td>inches</Td>
                <Td>millimetres (mm)</Td>
                <Td>inches</Td>
                <Td>millimetres (mm)</Td>
                <Td>inches</Td>
                <Td>millimetres (mm)</Td>
              </Tr>

              <Tr>
                <Td>inches</Td>
                <Td>millimetres (mm)</Td>
                <Td>inches</Td>
                <Td>millimetres (mm)</Td>
                <Td>inches</Td>
                <Td>millimetres (mm)</Td>
              </Tr>

            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}

export default Location