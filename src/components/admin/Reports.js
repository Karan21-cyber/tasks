import {
  Box,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React from "react";

function Reports() {
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
        Report List
      </Heading>

      <Box marginLeft="1rem">
        <Heading
          color="gray"
          fontSize="20px"
          fontWeight="600"
          textDecor="underline"
          marginBottom="10px"
        >
          List of Report
        </Heading>
        <Text>
          Here is the list of all the parking Locations spaces where we can
          manage our Locations
        </Text>

        <Box marginTop="3rem" marginInline="20px">
          <TableContainer>
            <Table variant="simple">
              <Thead color="white" bg="blue.800">
                <Tr>
                  <Th color="white">Id</Th>
                  <Th color="white">Name</Th>
                  <Th color="white">Loaction Name</Th>
                  <Th color="white">Space Name</Th>
                  <Th color="white">Slot No</Th>
                  <Th color="white">Vehical No</Th>
                  <Th color="white">Entry Date</Th>
                  <Th color="white">Total Hrs</Th>
                  <Th color="white">Payment</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>inches</Td>
                  <Td>millimetres (mm)</Td>
                  <Td>inches</Td>
                  <Td>millimetres (mm)</Td>
                  <Td>millimetres (mm)</Td>
                  <Td>millimetres (mm)</Td>
                  <Td>inches</Td>
                  <Td>millimetres (mm)</Td>
                  <Td>millimetres (mm)</Td>
                </Tr>

                <Tr>
                  <Td>inches</Td>
                  <Td>millimetres (mm)</Td>
                  <Td>inches</Td>
                  <Td>millimetres (mm)</Td>
                  <Td>millimetres (mm)</Td>
                  <Td>millimetres (mm)</Td>
                  <Td>inches</Td>
                  <Td>millimetres (mm)</Td>
                  <Td>millimetres (mm)</Td>
                </Tr>

                <Tr>
                  <Td>inches</Td>
                  <Td>millimetres (mm)</Td>
                  <Td>inches</Td>
                  <Td>millimetres (mm)</Td>
                  <Td>millimetres (mm)</Td>
                  <Td>millimetres (mm)</Td>
                  <Td>inches</Td>
                  <Td>millimetres (mm)</Td>
                  <Td>millimetres (mm)</Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Box>
  );
}

export default Reports;
