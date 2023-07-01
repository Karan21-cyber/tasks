import { Box, Button, Card, CardBody, CardFooter, CardHeader, Heading, Icon, Image, Text } from "@chakra-ui/react";
import React from "react";
import homeimage from "../assets/homepage.jpg";
import { SettingsIcon } from '@chakra-ui/icons'
import AddLocationIcon from "@mui/icons-material/AddLocation";
import AddToHomeScreenIcon from "@mui/icons-material/AddToHomeScreen";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import {  useNavigate } from "react-router-dom";

function Home() {

  const navigate = useNavigate();

  return (
    <Box bg="gray">
      <Box bg="black">
        <Image src={homeimage} height="80vh" width="100%" opacity={0.5} />
        <Text
          position="absolute"
          top="40vh"
          marginInline="35%"
          color="white"
          textAlign="center"
          fontSize="40px"
        >
          Welcome To Parking System
        </Text>
      </Box>

      <Box
        display="flex"
        justifyContent="center"
        gap="1rem"
        paddingBlock="3rem"
      >
        <Card width="220px">
          <Icon
            width="100"
            fontSize="35px"
            marginTop="1rem"
            display="flex"
            justifyContent="center"
          >
            <TravelExploreIcon />
          </Icon>
          <CardHeader>
            <Heading size="sm">Place Your Parking</Heading>
          </CardHeader>
          <CardBody>
            <Text>
              View a summary of all your customers over the last month.
            </Text>
          </CardBody>
          <CardFooter>
            <Button onClick={(e) => navigate("/search")}>Parking</Button>
          </CardFooter>
        </Card>
        <Card width="220px">
          <SettingsIcon
            width="100"
            fontSize="35px"
            marginTop="1rem"
            display="flex"
            justifyContent="center"
          />
          <CardHeader>
            <Heading size="sm">Parking Management</Heading>
          </CardHeader>
          <CardBody>
            <Text>
              View a summary of all your customers over the last month.
            </Text>
          </CardBody>
          <CardFooter>
            <Button>View here</Button>
          </CardFooter>
        </Card>

        <Card width="220px">
          <Icon
            width="100"
            fontSize="35px"
            marginTop="1rem"
            display="flex"
            justifyContent="center"
          >
            <AddLocationIcon />
          </Icon>

          <CardHeader>
            <Heading size="sm"> Location Management</Heading>
          </CardHeader>
          <CardBody>
            <Text>
              View a summary of all your customers over the last month.
            </Text>
          </CardBody>
          <CardFooter>
            <Button>View here</Button>
          </CardFooter>
        </Card>

        <Card width="220px">
          <Icon
            width="100"
            fontSize="35px"
            marginTop="1rem"
            display="flex"
            justifyContent="center"
          >
            <AddToHomeScreenIcon />
          </Icon>
          <CardHeader>
            <Heading size="sm"> Booking Management</Heading>
          </CardHeader>
          <CardBody>
            <Text>
              View a summary of all your customers over the last month.
            </Text>
          </CardBody>
          <CardFooter>
            <Button>View here</Button>
          </CardFooter>
        </Card>

        <Card width="220px">
          <Icon
            width="100"
            fontSize="35px"
            marginTop="1rem"
            display="flex"
            justifyContent="center"
          >
            <AccountBalanceIcon />
          </Icon>
          <CardHeader>
            <Heading size="sm">Online Payment</Heading>
          </CardHeader>
          <CardBody>
            <Text>
              View a summary of all your customers over the last month.
            </Text>
          </CardBody>
          <CardFooter>
            <Button>View here</Button>
          </CardFooter>
        </Card>
      </Box>
    </Box>
  );
}

export default Home;
