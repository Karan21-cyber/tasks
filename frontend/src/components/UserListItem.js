import { Avatar, Box,Text } from '@chakra-ui/react'
import React from 'react'

function UserListItem({handleFunction, users}) {
    // const {user} = ChatState();
    const username = users.firstname +" "+ users.lastname;

  return (
    <Box
      onClick={handleFunction}
      cursor="pointer"
      bg="#E8E8E8"
      _hover={{
        background: "#38B2AC",
        color: "white",
      }}
      width="100%"
      display="flex"
      alignItems="center"
      color="black"
      paddingBlock={2}
      paddingInline={3}
      marginBlock={2}
      borderRadius="lg"
    >
      <Avatar
        mr={2}
        size="sm"
        cursor="posinter"
        name={username}
        src={users.picture}
      />
      <Box>
        <Text>{username}</Text>
        <Text>
          <b>Email:</b>
          {users.email}
        </Text>
      </Box>
    </Box>
  );
}

export default UserListItem