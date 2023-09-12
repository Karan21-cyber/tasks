import React, { useEffect, useState } from 'react'
import io from 'socket.io-client';
// import Peer from "simple-peer";
import {Peer} from "peerjs"
import { useNavigate, useParams } from 'react-router-dom';
import { ChatState } from '../context/ChatProvider';
import { Box, IconButton } from '@chakra-ui/react';

import CallEndIcon from "@material-ui/icons/CallEnd";
import MicIcon from "@material-ui/icons/Mic";
import MicOffIcon from "@material-ui/icons/MicOff";
import VideocamIcon from "@material-ui/icons/Videocam";
import VideocamOffIcon from "@material-ui/icons/VideocamOff";
import axios from 'axios';

const ENDPOINT = "http://localhost:5000";
var socket;

function CallVideo() {

  
const [mic, setMic] = useState(true);
const [show, setShow] = useState(true);

const {user,messageId,setSelectedChat} = ChatState();
const params = useParams();
const navigate = useNavigate(); 


  useEffect(() => {
    socket = io(ENDPOINT);
    const videoGrid = document.getElementById("video-grid");
    const myVideo = document.createElement("video");
    
    const roomId = params.roomId;
    const myPeer = new Peer();

    const peers = [];

        const addVideoStream = (video, stream) => {
          video.srcObject = stream;
          video.addEventListener("loadedmetadata", () => {
            video.play();
          });
          videoGrid.append(video);
        };

        const connectToNewUser = (userId, stream) => {
          const call = myPeer.call(userId, stream);
          const video = document.createElement("video");
          call.on("stream", (userVideoStream) => {
            addVideoStream(video, userVideoStream);
          });
          call.on("close", () => {
            video.remove();
          });
        };

    navigator.mediaDevices
      .getUserMedia({
        video: {show},
        audio: {mic},
      })
      .then((stream) => {
        addVideoStream(myVideo, stream);

        myPeer.on("call", (call) => {
          call.answer(stream);
          const video = document.createElement("video");
          call.on("stream", (userVideoStream) => {
            addVideoStream(video, userVideoStream);
          });
        });

        socket.on("user-connected", (userId) => {
          connectToNewUser(userId, stream);
        });
        
      });

    socket.on("user-disconnected", (userId) => {
      console.log(userId);
      if (peers[userId]) peers[userId].close();
    });

    myPeer.on("open", (id) => {
      socket.emit("join-room", roomId, id);
    });

    socket.on("user-connected", (userId) => {
      console.log("user connected :" + userId);
    });

  }, [params.roomId, mic, show]);


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
          // setCalling(false);
          // window.location.reload();
          setSelectedChat();
          navigate('/chats');

        }
 }

 const handleCamera = (par) => {
 setShow(par);
 }

 const handleMic = (par) => {
setMic(par);
 }



  return (
    <Box>
      <Box display="flex" justifyContent="center" flexDirection="column" gap='2rem' bg='purple' height='100vh'>
        
        <div id="video-grid"></div>
        
        <Box display="flex" justifyContent="center" gap="2rem" marginTop="2rem">
          {/* mic */}
          {mic ? (
            <IconButton
              width="20px"
              colorScheme="teal"
              aria-label="Call Segun"
              size="md"
              mx={1}
              icon={<MicIcon />}
              onClick={(event) => handleMic(false)}
            />
          ) : (
            <IconButton
              width="20px"
              colorScheme="teal"
              aria-label="Call Segun"
              size="md"
              mx={1}
              icon={<MicOffIcon />}
              onClick={(event) => handleMic(true)}
            />
          )}

          {/* video show */}
          {show ? (
            <IconButton
              width="20px"
              colorScheme="teal"
              aria-label="Call Segun"
              size="md"
              mx={1}
              icon={<VideocamIcon />}
              onClick={(event) => handleCamera(false)}
            />
          ) : (
            <IconButton
              width="20px"
              colorScheme="teal"
              aria-label="Call Segun"
              size="md"
              mx={1}
              icon={<VideocamOffIcon />}
              onClick={(event) => handleCamera(true)}
            />
          )}

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
    </Box>
  );
}

export default CallVideo