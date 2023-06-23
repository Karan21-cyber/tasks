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
} from "@chakra-ui/react";
import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";

function Spaces() {
  const navigate = useNavigate();

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
        Manage Locations Spaces
      </Heading>

      <Box marginLeft="1rem">
        <Heading
          color="gray"
          fontSize="20px"
          fontWeight="600"
          textDecor="underline"
          marginBottom="10px"
        >
          List of Location Spaces
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
                  <Th color="white">Location Name</Th>
                  <Th color="white">Space Name</Th>
                  <Th color="white">Total Spaces</Th>
                  <Th color="white">Amount Per Slot</Th>
                  <Th color="white">Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>inches</Td>
                  <Td>millimetres (mm)</Td>
                  <Td>inches</Td>
                  <Td>millimetres (mm)</Td>
                  <Td>millimetres (mm)</Td>
                  <Td display="flex" gap="1rem">
                    <Icon fontSize="20px" color="green.400" cursor="pointer" onClick={() => navigate('/editSpace')}>
                      <EditIcon />
                    </Icon>
                    <Icon fontSize="20px" color="red" cursor="pointer">
                      <DeleteIcon />
                    </Icon>
                  </Td>
                </Tr>

                <Tr>
                  <Td>inches</Td>
                  <Td>millimetres (mm)</Td>
                  <Td>inches</Td>
                  <Td>millimetres (mm)</Td>
                  <Td>millimetres (mm)</Td>
                  <Td display="flex" gap="1rem">
                    <Icon fontSize="20px" color="green.400" cursor="pointer">
                      <EditIcon />
                    </Icon>
                    <Icon fontSize="20px" color="red" cursor="pointer">
                      <DeleteIcon />
                    </Icon>
                  </Td>
                </Tr>

                <Tr>
                  <Td>inches</Td>
                  <Td>millimetres (mm)</Td>
                  <Td>inches</Td>
                  <Td>millimetres (mm)</Td>
                  <Td>millimetres (mm)</Td>
                  <Td display="flex" gap="1rem">
                    <Icon fontSize="20px" color="green.400" cursor="pointer">
                      <EditIcon />
                    </Icon>
                    <Icon fontSize="20px" color="red" cursor="pointer">
                      <DeleteIcon />
                    </Icon>
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Box>
  );
}

export default Spaces;
