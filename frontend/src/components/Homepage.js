import React, { useEffect } from 'react'
import {
  Stack,
  Box,
  Image,
  Center,
  Tab,Tabs,TabList,TabPanel,TabPanels,  
} from "@chakra-ui/react";

import Signup from './Signup';
import Login from './Login';
import { useNavigate } from 'react-router-dom';

function Homepage() {

  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    if(user) {
      navigate('/chats');
    }
  },[navigate]);


  return (
    <Stack direction="row">
      <Box width="50%" className="homepage">
        <Image
          boxSize="100%"
          objectFit="cover"
          height="100vh"
          src={require("../assets/chat.png")}
        />
      </Box>

      <Box width="50%" bgColor="#e3e3e3" h="100vh" overflowY="scroll">
        <Center
          bg="white"
          h="80px"
          marginInline="1rem"
          marginBlock="1rem"
          color="black"
          fontSize="25px"
        >
          Chat Connects
        </Center>

        <Tabs
          variant="soft-rounded"
          colorScheme="green"
          bg="white"
          marginInline="1rem"
          padding="1rem"
        >
          <TabList width="100%">
            <Tab width="50%">Log in</Tab>
            <Tab width="50%">Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              {/* login */}
              <Login />
            </TabPanel>
            <TabPanel>
              {/* signup */}
              <Signup />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Stack>
  );
}

export default Homepage