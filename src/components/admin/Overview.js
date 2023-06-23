import { Box, Card, CardBody, Heading, Icon, Text } from "@chakra-ui/react";
import React from "react";
import PersonIcon from "@mui/icons-material/Person";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import CardTravelIcon from "@mui/icons-material/CardTravel";
import { useNavigate } from "react-router-dom";

function Overview() {
  const navigate = useNavigate();

  return (
    <Box display="flex" flexDirection="column" gap="2rem" width="100%">
      <Heading
        bg="gray.800"
        color="white"
        marginLeft="1px"
        width="100"
        paddingBlock="1rem"
        textAlign="center"
      >
        Admin Dashboard
      </Heading>

      <Box marginTop="1rem" marginLeft="1rem">
        <Heading
          color="gray"
          fontSize="25px"
          fontWeight="600"
          textDecor="underline"
        >
          Welcome to Dashboard, Admin
        </Heading>

        <Box
          marginTop="2rem"
          marginLeft="2rem"
          display="flex"
          flexWrap="wrap"
          gap="2.5rem"
        >
          <Card
            bg="gray"
            color="white"
            width="250px"
            height="150px"
            cursor="pointer"
            onClick={() => navigate("/users")}
          >
            <Icon
              width="100"
              fontSize="50px"
              marginTop="1rem"
              display="flex"
              justifyContent="center"
            >
              <PersonIcon />
            </Icon>
            <CardBody>
              <Heading size="sm"> Total Users</Heading>
              <Text>100</Text>
            </CardBody>
          </Card>

          <Card
            bg="gray"
            color="white"
            width="250px"
            height="150px"
            cursor="pointer"
            onClick={() => navigate("/locations")}
          >
            <Icon
              width="100"
              fontSize="50px"
              marginTop="1rem"
              display="flex"
              justifyContent="center"
            >
              <LocationOnIcon />
            </Icon>
            <CardBody>
              <Heading size="sm">Total Locations</Heading>
              <Text>100</Text>
            </CardBody>
          </Card>

          <Card bg="gray" color="white" width="250px" height="150px">
            <Icon
              width="100"
              fontSize="50px"
              marginTop="1rem"
              display="flex"
              justifyContent="center"
            >
              <MonetizationOnIcon />
            </Icon>
            <CardBody>
              <Heading size="sm">Total Earnings</Heading>
              <Text>$ 100</Text>
            </CardBody>
          </Card>

          <Card
            bg="gray"
            color="white"
            width="250px"
            height="150px"
            cursor="pointer"
            onClick={() => navigate("/reports")}
          >
            <Icon
              width="100"
              fontSize="50px"
              marginTop="1rem"
              display="flex"
              justifyContent="center"
            >
              <CardTravelIcon />
            </Icon>
            <CardBody>
              <Heading size="sm">View Report</Heading>
              <Text>100</Text>
            </CardBody>
          </Card>
        </Box>
      </Box>
    </Box>
  );
}

export default Overview;
