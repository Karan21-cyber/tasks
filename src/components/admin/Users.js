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

function Users() {

    const [users,setUsers] = useState([]);

    const fetchUsers = async () => {
      const url = "http://localhost:5000/api/user/";
      const data = await axios.get(url);
      setUsers(data.data);
    };

    useEffect(() => {
      fetchUsers();
    }, []);

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
        User List
      </Heading>

      <Box marginLeft="1rem">
        <Heading
          color="gray"
          fontSize="20px"
          fontWeight="600"
          textDecor="underline"
          marginBottom="10px"
        >
          List of All Users
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
                  <Th color="white">Email</Th>
                  <Th color="white">Phone</Th>
                  <Th color="white">Address</Th>
                </Tr>
              </Thead>
              <Tbody>
                {users.map((userData, index) => (
                  <Tr key={index}>
                    <Td>{index + 1}</Td>
                    <Td>{userData.name}</Td>
                    <Td>{userData.email}</Td>
                    <Td>{userData.phone}</Td>
                    <Td>{userData.address}</Td>
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

export default Users;
