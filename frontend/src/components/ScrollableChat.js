import React, { useEffect, useState } from 'react'
import ScrollableFeed from "react-scrollable-feed"
import { isLastMessage, isSameSender, isSameSenderMargin, isSameUser } from './getSender'
import { ChatState } from '../context/ChatProvider'
import { Avatar, Box, Heading, IconButton, Text, Tooltip} from '@chakra-ui/react';
import {  FaVideo } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import CallEndIcon from "@material-ui/icons/CallEnd";
import axios from 'axios';


function ScrollableChat({messages}) {
  // const [caller, setCaller] = useState;
  const [roomId , setRoomId] = useState();
  const {
    user,
    setCalling,
    calling,
    videoLink,
    callerName,
    messageId,
  } = ChatState();

  const navigate = useNavigate();

useEffect(() => {
 if (videoLink && messageId) {
   const split_link = videoLink.split(":");
   const call = split_link[0];
   const video_id = split_link[1];
 

   if (call === "Answer" && video_id) {
     setCalling(true);
     setRoomId(video_id);
   } else {
     setCalling(false);
   }
 }

},[videoLink, messageId])
   

    const answerCall = () => {
      setCalling(false);
      navigate(`/videocall/${roomId}`);
    }

    const declineCall = async() => {
      const content = "Call ended";

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
        const update = await axios.put(
          "http://localhost:5000/api/message/update",
          { messageId, content },config
        );

        if(update){
          setCalling(false);
          window.location.reload();
          // navigate('/chats');
        }
    }
  

  return (
    <ScrollableFeed>
      {calling === true ? (
        <Box
          display="flex"
          justifyContent="center"
          marginTop="20%"
          flexDirection="column"
        >
          <Heading textAlign="center" color="blue.800">
            {callerName}
          </Heading>
          <Text textAlign="center" marginBlock={2}>
            Calling...
          </Text>
          <Box
            width="100"
            alignItems="center"
            display="flex"
            justifyContent="center"
            gap="1rem"
          >
            <IconButton
              width="20px"
              colorScheme="teal"
              aria-label="Call Segun"
              size="md"
              mx={1}
              icon={<FaVideo />}
              onClick={(event) => answerCall()}
            />

            <IconButton
              width="20px"
              colorScheme="red"
              aria-label="Call Segun"
              size="md"
              mx={1}
              icon={<CallEndIcon />}
              onClick={(event) => declineCall()}
            />

          </Box>
        </Box>
      ) : (
        messages &&
        messages.map((m, i) =>
          answerCall(videoLink) && calling ? (
            "calling true"
          ) : (
            <div style={{ display: "flex" }} key={m._id}>
              {(isSameSender(messages, m, i, user._id) ||
                isLastMessage(messages, i, user._id)) && (
                <Tooltip
                  label={m.sender.firstname}
                  placement="bottom-start"
                  hasArrow
                >
                  <Avatar
                    mt="7px"
                    mr={1}
                    size="sm"
                    cursor="pointer"
                    name={m.sender.firstname}
                    src={m.sender.picture}
                  />
                </Tooltip>
              )}

              <span
                style={{
                  backgroundColor: `${
                    m.sender._id === user._id ? "#BEE3F8" : "#B9F5D0"
                  }`,
                  borderRadius: "20px",
                  padding: "5px 15px",
                  maxWidth: "75%",
                  marginLeft: isSameSenderMargin(messages, m, i, user._id),
                  marginTop: isSameUser(messages, m, i, user._id) ? 3 : 10,
                }}
              >
                {m.content}
              </span>
            </div>
          )
        )
      )}
    </ScrollableFeed>
  );
}

export default ScrollableChat