import React, { useState } from 'react'
import {FormControl,FormLabel,Button,Input,VStack,Box, InputGroup, InputRightElement, useToast} from "@chakra-ui/react"
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {useNavigate} from "react-router-dom";
import axios from 'axios';



function Login() {
    const [show, setShow] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const toast = useToast();
    const navigate = useNavigate();

    const handleClick = () => {
      setShow(true);
    };

    const formSignup = async () => {
      if (!email || !password) {
        toast({
          title: "Please Fill all the fields",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        return;
      }

      try {
        setLoading(true);
        const url = "http://localhost:5000/api/user/login";
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };

        const { data } = await axios.post(url, { email, password }, config);
        toast({
          title: "Login Successful",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        localStorage.setItem("userInfo", JSON.stringify(data));

        setLoading(false);
        navigate("/chats");
        
      } catch (error) {
        setLoading(false);
        toast({
          title: "Error Occurred",
          description: error.response.data.error.message,
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      }
    };

  return (
    <VStack>

      <FormControl isRequired>
        <FormLabel>Email</FormLabel>
        <Input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      </FormControl>

      <FormControl isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement>
            <Button 
            onClick={handleClick} 
            bg="none"
            >
              {show ? <ViewOffIcon /> : <ViewIcon />}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <Box marginTop="1rem" width="100%">
        <Button 
        width="100px" 
        bg="blue.200"
        onClick={formSignup}
        isLoading ={loading}
        >
          Login
        </Button>
      </Box>
    </VStack>
  );
}

export default Login