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
import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Spaces() {

  const [spaces , setSpaces ] = useState([]);

  const navigate = useNavigate();

  const fetchSpaces = async() => {
    const url = "http://localhost:5000/api/space/";
    const data = await axios.get(url);
    setSpaces(data.data);
  }

  useEffect(() => {
    fetchSpaces();
  },[])

const handleEdit = (space) => {
  navigate(`/editSpace/${space._id}`);
}

const handleRemove = async(id) => {
  const url = `http://localhost:5000/api/space/remove/${id}`;
  const data = await axios.delete(url);

  if(data){
    fetchSpaces();
   navigate("/spaces");
  }
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
                {spaces.map((space, index) => (
                  <Tr key={index}>
                    <Td>{index + 1}</Td>
                    <Td>{space.location[0].locationName}</Td>
                    <Td>{space.spaceName}</Td>
                    <Td>{space.slots}</Td>
                    <Td>{space.price}</Td>
                    <Td display="flex" gap="1rem">
                      <Icon
                        fontSize="20px"
                        color="green.400"
                        cursor="pointer"
                        onClick={() => handleEdit(space)}
                      >
                        <EditIcon />
                      </Icon>
                      <Icon
                        fontSize="20px"
                        color="red"
                        cursor="pointer"
                        onClick={() => handleRemove(space._id)}
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

export default Spaces;
