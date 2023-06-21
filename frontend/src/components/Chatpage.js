import React,{useState} from 'react'
import { ChatState } from '../context/ChatProvider';
import { Box } from '@chakra-ui/react';
import SideDrawer from "./SideDrawer";
import MyChats from "./MyChats";
import ChatBox from "./ChatBox";

function Chatpage() {
  
  const {user} = ChatState();
  const [fetchAgain, setFetchAgain] = useState(false);

  return (
    <div className="chat-page">
      {user && <SideDrawer />}
      <Box
        display="flex"
        justifyContent="space-between"
        width="100%"
        paddingInline="1rem"
        height="90vh"
        bg="#e3e3e3"
      >
        {user && (
          <MyChats fetchAgain={fetchAgain} />
        )}
        {user && (
          <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </Box>
    </div>
  );
}

export default Chatpage