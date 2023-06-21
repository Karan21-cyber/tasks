import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  return (
    <Box bg="gray" paddingBlock="1rem" height="90vh">
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <Heading
          borderBottom="2px solid "
          marginBlock="1rem"
          color="whiteAlpha.800"
          fontWeight="600"
        >
          Login Form
        </Heading>

        <Box
          width="500px"
          bg="whiteAlpha.900"
          padding="1rem"
          gap="1rem"
          borderRadius="5px"
          opacity="0.9"
        >
        
          <FormControl marginTop="10px">
            <FormLabel fontSize="15px" fontWeight="400">
              Email
            </FormLabel>
            <Input placeholder="abc@gmail.com" type="email" />
          </FormControl>

          <FormControl marginTop="10px">
            <FormLabel fontSize="15px" fontWeight="400">
              Password
            </FormLabel>
            <Input placeholder="Password" type="Password" />
          </FormControl>

          <Text
            marginTop="2rem"
            color="gray"
            fontSize="12px"
            display="flex"
            gap="5px"
          >
            Don't Have an account
            <Text
              color="blue"
              textDecoration="underline"
              cursor="pointer"
              onClick={(e) => navigate("/signup")}
            >
              <b>Register</b>
            </Text>
            .
          </Text>
          <Button marginBlock="1rem" color="white" bg="green.400">
            Login
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default  Login;
