import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const [show, setShow] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
  const navigate = useNavigate();

   const handleClick = () => {
     setShow(true);
   };

  const toast = useToast();

   const handleLogin = async() => {
    if(!email || !password){
      toast({
        title:"Fill all the Fields",
        status:"warning",
        duration:5000,
        isClosable:true,
        position:"bottom"
      })
      return;
    }

    try{
      const url = "http://localhost:5000/api/user/login";

      const config = {
        headers:{
          "Content-Type":"application/json",
        },
      }

      const data = await axios.post(url,{email,password},config);

      toast({
        title:"Login Successful",
        status:"success",
        duration:5000,
        isClosable:true,
        position:"bottom"
      })

      localStorage.setItem("userInfo", JSON.stringify(data.data))
      
      navigate("/");

    }
    catch(error){
      toast({
        title:"Error Occured",
        status:"warning",
        duration:5000,
        isClosable:true,
        position:"bottom",
      })
    }
   }



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
          <FormControl isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
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
                <Button onClick={handleClick} bg="none">
                  {show ? <ViewOffIcon /> : <ViewIcon />}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>

          <Box
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
          </Box>
          <Button marginBlock="1rem" color="white" bg="green.400"
          onClick={handleLogin}
          >
            Login
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default  Login;
