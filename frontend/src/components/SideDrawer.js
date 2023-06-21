import React, { useState } from "react";
import {
  Box,
  Tooltip,
  Button,
  Text,
  Menu,
  MenuButton,
  MenuList,
  Avatar,
  MenuItem,
  MenuDivider,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  useDisclosure,
  DrawerBody,
  Input,
  useToast,
  InputGroup,
  InputRightElement,
  Spinner,
} from "@chakra-ui/react";
import { BellIcon, SearchIcon } from "@chakra-ui/icons";
import { ChatState } from "../context/ChatProvider";
import Profile from "./Profile";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ChatLoading from "./ChatLoading";
import UserListItem from "./UserListItem";

function SideDrawer() {
  // const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  const navigate = useNavigate();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const { user, setSelectedChat, chats, setChats } = ChatState();
  const userData = user;
  // console.log(userData);

  const handlelogout = () => {
    localStorage.removeItem("userInfo");
    navigate("/");
  };

const handleSearch = async (search) => {
  if (!search) {
    toast({
      title: "Please enter something in the search field",
      status: "warning",
      duration: 5000,
      isClosable: true,
      position: "top-left",
    });
    return;
  }

  try {
    setLoading(true);
    const config = {
      headers: {
        Authorization: `Bearer ${userData.token}`,
      },
    };

    const response = await axios.get(
      `http://localhost:5000/api/user?search=${encodeURIComponent(search)}`,
      config
    );
    const { data } = response;
    setLoading(false);
    setSearchResult(data);
  } catch (error) {
    toast({
      title: "User Not Found",
      status: "error",
      duration: 5000,
      isClosable: true,
      position: "bottom-left",
    });
    setLoading(false);
    setSearchResult([]);
  }
};

  const accessChat = async (userId) => {
    try {
      setLoadingChat(true);

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userData.token}`,
        },
      };
      const { data } = await axios.post(
        `http://localhost:5000/api/chat/`,
        { userId },
        config
      );

      if (!chats.find((c) => c._id === data._id)) {
        setChats([data, ...chats]);
      }

      setSelectedChat(data);
      setLoadingChat(false);
      onClose();
    } catch (error) {
      toast({
        title: "Error Fetching the chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  // console.log(searchResult);

  return (
    <>
      <Box paddingBlock="8px" display="flex" justifyContent="space-between">
        <Tooltip label="Search Users to Chat" hasArrow placement="bottom-end">
          <Button
            variant="ghost"
            display="flex"
            gap="10px"
            marginStart="10px"
            onClick={onOpen}
          >
            <SearchIcon />
            <Text>Search User</Text>
          </Button>
        </Tooltip>

        <Text fontSize="2xl" fontFamily="Work sans">
          Chat Connect
        </Text>

        <Box marginEnd="10px">
          <Menu>
            <MenuButton p={1}>
              <BellIcon fontSize="2xl" m={1} />
            </MenuButton>
            {/* <MenuList></MenuList> */}
          </Menu>

          <Menu>
            <MenuButton>
              <Avatar
                size="sm"
                cursor="pointer"
                name={userData.firstname}
                src={userData.picture}
              />
            </MenuButton>
            <MenuList>
              <Profile user={userData}>
                <MenuItem>My Profile</MenuItem>
              </Profile>
              <MenuDivider />
              <MenuItem onClick={handlelogout} cursor="pointer">
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Box>

      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <Text
            borderBottomWidth="1px"
            fontSize="20px"
            textAlign="center"
            paddingBlock="1rem"
          >
            Search Users
          </Text>
          <DrawerBody>
            <Box display="flex" border="1px solid lightgray" borderRadius="5px">
              <InputGroup>
                <Input
                  outline="none"
                  border="none"
                  type="text"
                  placeholder="Search by name or email"
                  onChange={(e) => handleSearch(e.target.value)}
                />

                <InputRightElement>
                  <Button bg="none" borderRadius="none">
                    <SearchIcon />
                  </Button>
                </InputRightElement>
              </InputGroup>
            </Box>
            {loading ? (
              <ChatLoading />
            ) : (
              searchResult.map((searchUser) => (
                <UserListItem
                  key={searchUser._id}
                  handleFunction={() => accessChat(searchUser._id)}
                  users={searchUser}
                />
              ))
            )}
            {loadingChat && <Spinner ml="auto" display="flex" />}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default SideDrawer;
