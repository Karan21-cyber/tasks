import { Box, Text } from '@chakra-ui/react'
import React from 'react'

function Footer() {
  return (
    <Box
      bg="gray.600"
      height="10vh"
      textAlign="center"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Text color="gray.400">CopyRight &copy; 2023 , Parking System</Text>
    </Box>
  );
}

export default Footer