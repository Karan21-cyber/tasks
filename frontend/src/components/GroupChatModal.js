import { Box, Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { ChatState } from '../context/ChatProvider';
import axios from 'axios';
import UserListItem from './UserListItem';
import UserBadgeItem from './UserBadgeItem';

function GroupChatModal({children}) {
    const {isOpen, onOpen, onClose} = useDisclosure();
    const [groupName, setGroupName] = useState();
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);

    const toast = useToast();

    const {user, chats, setChats} = ChatState();

    const handleSearch = async (query) => {
        if(!query){
            return;
        }

        try{
            setLoading(true);
            const config = {
              headers: {
                Authorization: `Bearer ${user.token}`,
              },
            };

            const { data } = await axios.get(
              `http://localhost:5000/api/user?search=${query}`,
              config
            );
            setLoading(false);
           setSearchResult(data);
        }
        catch(error){
            return error;
        }
    }

    const handleSubmit = async() => {
        if(!groupName ||!selectedUsers){
            toast({
                title:"Please fill all the fields",
                status:"warning",
                duration:5000,
                isClosable:true,
                position:"top",
            });
            return;
        }

        try{
            const config ={
                headers : {
                    Authorization : `Bearer ${user.token}`,
                },
            };

            const { data } = await axios.post("http://localhost:5000/api/chat/group",
            {
                name:groupName,
                users:JSON.stringify(selectedUsers.map((u) => u._id)),
            },config);

            setChats([data,...chats]);
            onClose();
        }
        catch(error){
            toast({
                title:"Failed to Create the Chat!",
                status:"error",
                duration:5000,
                isClosable:true,
                position:"bottom",
            });
            
        }
    }

    const handleDelete = (delUser) =>  {
        setSelectedUsers(
            selectedUsers.filter((del) => del._id !== delUser._id)
        )
    }


    const handleGroup = (userToAdd) => {
        if(selectedUsers.includes(userToAdd)){
            toast({
                title:"User Already Added",
                status:"warning",
                duration:5000,
                isClosable:true,
                position:"top",
            });
            return;
        }

        setSelectedUsers([...selectedUsers,userToAdd])
    };


    return (
      <>
        <span onClick={onOpen}>{children}</span>

        <Modal onClose={onClose} isOpen={isOpen}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader
              fontSize="35px"
              fontFamily="Work sans"
              display="flex"
              justifyContent="center"
            >
              Create Group Chat
            </ModalHeader>
            <ModalCloseButton />

            <ModalBody
              display="flex"
              flexDirection="column"
              alignItems="center"
            >
              <FormControl>
                <FormLabel>Group Name</FormLabel>
                <Input
                  placeholder="Group Name"
                  onChange={(e) => setGroupName(e.target.value)}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Add Users</FormLabel>
                <Input
                  placeholder="Add Users eg: John, Tom"
                  onChange={(e) => handleSearch(e.target.value)}
                />
              </FormControl>
              {/* selected users */}
              <Box 
                width="100%"
                display="flex"
                flexWrap="wrap"               
                >
                {" "}
                {selectedUsers.map((user) => (
                  <UserBadgeItem
                    key={user._id}
                    user={user}
                    handleFunction={() => handleDelete(user)}
                  />
                ))}
              </Box>

              {/* render searched users */}
              {loading ? (
                <div>Loading</div>
              ) : (
                searchResult
                  ?.slice(0, 4)
                  .map((user) => (
                    <UserListItem
                      key={user._id}
                      users={user}
                      handleFunction={() => handleGroup(user)}
                    />
                  ))
              )}
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" onClick={handleSubmit}>
                Create Chat
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
}

export default GroupChatModal