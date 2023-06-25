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
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Signup() {
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [address, setAddress] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const navigate = useNavigate();
  const toast = useToast();

  const handleClick = () => {
    setShow(true);
  };

  const handleClick2 = () => {
    setShow2(true);
  };

  const handleSubmit = async () => {
   if(!name || !email || !phone || !address || !password || !confirmPassword){
      toast({
        title:"Please Fill all the Fields",
        status:"warning",
        duration:5000,
        isClosable:true,
        position:"top"
      });
      return;
   }

   if(password !== confirmPassword){
    toast({
      title:"Password Doesn't Match",
      status:"warning",
      duration:5000,
      isClosable:true,
      position:"top"
    });
    return;
   }

   try{
    const url = "http://localhost:5000/api/user/register";
      const config = {
        headers:{
          "Content-Type" :"application/json",
        },
      };

      const data = await axios.post(url,{name,email,phone,address,password},config);

      toast({
        title:"Registration Successful",
        status:"success",
        duration:5000,
        isClosable:true,
        position:"bottom",
      });

      
      navigate("/login");

   }
   catch(error){
    toast({
      title:"Error Occured",
      status:"warning",
      duration:5000,
      isClosable:true,
      position:"top"
    });
   }

  };

  return (
    <>
      <Box bg="gray" paddingBlock="1rem">
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
            User Registration Form
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
                Full name
              </FormLabel>
              <Input
                placeholder="Full name"
                onChange={(e) => setName(e.target.value)}
              />
            </FormControl>

            <FormControl marginTop="10px">
              <FormLabel fontSize="15px" fontWeight="400">
                Email
              </FormLabel>
              <Input
                placeholder="abc@gmail.com"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>

            <FormControl marginTop="10px">
              <FormLabel fontSize="15px" fontWeight="400">
                Phone Number
              </FormLabel>
              <Input
                placeholder="Phone Number"
                type="number"
                onChange={(e) => setPhone(e.target.value)}
              />
            </FormControl>

            <FormControl marginTop="10px">
              <FormLabel fontSize="15px" fontWeight="400">
                Address
              </FormLabel>
              <Input
                placeholder="Address"
                type="text"
                onChange={(e) => setAddress(e.target.value)}
              />
            </FormControl>

            <FormControl>
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

            <FormControl>
              <FormLabel>Confirm Password</FormLabel>
              <InputGroup>
                <Input
                  type={show2 ? "text" : "password"}
                  placeholder="Confirm Password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <InputRightElement>
                  <Button onClick={handleClick2} bg="none">
                    {show2 ? <ViewOffIcon /> : <ViewIcon />}
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
              Already Have an account
              <Text
                color="blue"
                textDecoration="underline"
                cursor="pointer"
                onClick={(e) => navigate("/login")}
              >
                <b>Login</b>
              </Text>
              .
            </Box>
            <Button
              marginBlock="1rem"
              color="white"
              bg="green.400"
              onClick={handleSubmit}
            >
              Signup
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default Signup;
