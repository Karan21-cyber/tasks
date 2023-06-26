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
import axios from "axios";
import React, { useEffect, useState } from "react";

function Reports() {

  const [reports, setReports] = useState([]);

  const fetchReports = async () => {
    const url = "http://localhost:5000/api/payment";
    const data = await axios.get(url);
    setReports(data.data);
  };

  useEffect(() => {
    fetchReports();
  }, []);

  return (
    <Box display="flex" flexDirection="column" gap="2rem" width="100%"
    height="100vh" overflowY="scroll">
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
                {reports.map((data, index) => (
                  <Tr key={index}>
                    <Td>{index + 1}</Td>
                    <Td>{data.user[0].name}</Td>
                    <Td>{data.location[0].locationName}</Td>
                    <Td>{data.space[0].spaceName}</Td>
                    <Td>{data.slotNo}</Td>
                    <Td>{data.vehicalNo}</Td>
                    <Td>{data.entryDate}</Td>
                    <Td>{data.totalHrs}</Td>
                    <Td>{data.amount}</Td>
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

export default Reports;
