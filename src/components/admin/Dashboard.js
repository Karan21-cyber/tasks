import { Box, Flex, Text } from '@chakra-ui/react';
import React from 'react'
import { Link, Route, Routes, useNavigate } from 'react-router-dom'
import {
  Overview,
  AddLocation,
  ManageLocation,
  AddSpace,
  EditLocation,
  EditSpace,
  Reports,
  Users,
  Spaces,
} from "./index";


function Dashboard() {

    const navigate = useNavigate();

  return (
    <Flex>
      <Flex
        flexDirection="column"
        gap="1rem"
        paddingLeft="1rem"
        paddingTop="2rem"
        width="15%"
        bg="gray.800"
        height="100vh"
        color="white"
      >
        <Text color="purple.600" fontWeight="600" fontSize="20px">
          Parking System
        </Text>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/locations">Manage Locations</Link>
        <Link to="/spaces">Manage Spaces</Link>
        <Link to="/users">Manage Users</Link>
        <Link to="/addlocation">Add Locations</Link>
        <Link to="/addspaces">Add Spaces</Link>
        <Link to="/reports">Manage Reports</Link>
        <Text onClick={() => navigate("/")} cursor="pointer">
          Logout
        </Text>
      </Flex>

      <Box width="85%">
        <Routes>
          <Route path="/dashboard" element={<Overview />} />
          <Route path="/locations" element={<ManageLocation />} />
          <Route path="/spaces" element={<Spaces />} />
          <Route path="/users" element={<Users />} />
          <Route path="/addlocation" element={<AddLocation />} />
          <Route path="/addspaces" element={<AddSpace />} />
          <Route path="/editlocation" element={<EditLocation />} />
          <Route path="/editSpace" element={<EditSpace />} />
          <Route path="/reports" element={<Reports />} />
        </Routes>
      </Box>
    </Flex>
  );
}

export default Dashboard