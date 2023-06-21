import React from 'react'
import {Box, Text} from "@chakra-ui/react";
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
    const navigate = useNavigate();
    
    const logout = () => {
        navigate("/");    
    }

  return (
    <Box
      display="flex"
      bg="gray.600"
      height="10vh"
      justifyContent="space-between"
      paddingX={7}
      alignItems="center"
      position="sticky"
      top="0"
      zIndex="1"
    >
      <Text onClick={(e) => navigate("/")} color="white" fontSize="1.2rem" cursor="pointer" >
        Parking System
      </Text>

      <Box 
      color="gray.300"
      display="flex"
      gap="1rem"
      fontSize="15px"
      >
        <Link to="/">Home</Link>
        <Link to="/signup">Signup</Link>
        <Link to="/login">Login</Link>
        <Link to="/search">Find Parking</Link>
        <Text onClick={logout} cursor="pointer" >Logout</Text>
      </Box>
    </Box>
  );
}

export default Navbar