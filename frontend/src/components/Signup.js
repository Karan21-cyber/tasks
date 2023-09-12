import React,{useState} from "react";
import {
  FormControl,
  FormLabel,
  Button,
  Input,
  VStack,
  Box,
  InputGroup,
  InputRightElement,
  useToast
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
// import axios from "axios";
import {useNavigate} from "react-router-dom";


function Signup() {

const [show, setShow] = useState(false);
const [show2, setShow2] = useState(false);
const [loading, setLoading] = useState(false);
const navigate = useNavigate();

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");
const [firstname, setFirstname] = useState("");
const [lastname, setLastname] = useState("");
const toast = useToast();

const handleClick = () => {
  setShow(true);
};

const handleClick2 = () => {
  setShow2(true);
};

const formlogin = async () => {
  setLoading(true);
  if (!firstname || !lastname || !email || !password || !confirmPassword) {
    toast({
      title: "Please Fill all the Fields",
      status: "warning",
      duration: 5000,
      isClosable: true,
      position: "bottom",
    });
    setLoading(false);
    return;
  }
  if (password !== confirmPassword) {
    toast({
      title: "Password Doesn't Match",
      status: "warning",
      duration: 5000,
      isClosable: true,
      position: "bottom",
    });
    setLoading(false);
    return;
  }

  try{
    toast({
      title: "Registration Successful",
      status: "success",
      duration: 5000,
      isClosable: true,
      position: "bottom",
    });
    
    setLoading(false);
    // localStorage.setItem('userInfo',JSON.parse(data));
    navigate('/');
  }
  catch(error){
     setLoading(false);
     toast({
       title: "Error Occured",
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
        <FormLabel>First Name</FormLabel>
        <Input
          placeholder="First Name"
          onChange={(e) => setFirstname(e.target.value)}
        />
      </FormControl>

      <FormControl isRequired>
        <FormLabel>Last Name</FormLabel>
        <Input
          placeholder="Last Name"
          onChange={(e) => setLastname(e.target.value)}
        />
      </FormControl>

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
            <Button onClick={handleClick} bg="none">
              {show ? <ViewOffIcon /> : <ViewIcon />}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl isRequired>
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
      
      <Box marginTop="1rem" width="100%">
        <Button width="100px" bg="green.200" onClick={formlogin}
        isLoading ={loading}
        >
          Signup
        </Button>
      </Box>
    </VStack>
  );
}

export default Signup;
