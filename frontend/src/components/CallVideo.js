import React, { useEffect, useState } from 'react'
import io from 'socket.io-client';
// import Peer from "simple-peer";
import {Peer} from "peerjs"
import { useParams } from 'react-router-dom';
import { ChatState } from '../context/ChatProvider';
import { Box, IconButton } from '@chakra-ui/react';

import CallEndIcon from "@material-ui/icons/CallEnd";
import MicIcon from "@material-ui/icons/Mic";
import MicOffIcon from "@material-ui/icons/MicOff";
import VideocamIcon from "@material-ui/icons/Videocam";
import VideocamOffIcon from "@material-ui/icons/VideocamOff";

const ENDPOINT = "http://localhost:5000";
var socket;

function CallVideo() {

  const [mic, setMic] = useState(false);
  const [show, setShow] = useState(false);
 const {user} = ChatState();
 const params = useParams();
 

  // console.log(roomId);
  // console.log(id);

  useEffect(() => {
    socket = io(ENDPOINT);
    const videoGrid = document.getElementById("video-grid");
    const myVideo = document.createElement("video");
    myVideo.muted = true;

    const id = user._id;
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
        video: true,
        audio: true,
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
  }, [mic,show]);


 const declineCall = () => {

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
              // onClick={(event) => declineCall()}
            />
          ) : (
            <IconButton
              width="20px"
              colorScheme="teal"
              aria-label="Call Segun"
              size="md"
              mx={1}
              icon={<MicOffIcon />}
              // onClick={(event) => declineCall()}
            />
          )}

          {/* video show */}
          {mic ? (
            <IconButton
              width="20px"
              colorScheme="teal"
              aria-label="Call Segun"
              size="md"
              mx={1}
              icon={<VideocamIcon />}
              // onClick={(event) => declineCall()}
            />
          ) : (
            <IconButton
              width="20px"
              colorScheme="teal"
              aria-label="Call Segun"
              size="md"
              mx={1}
              icon={<VideocamOffIcon />}
              // onClick={(event) => declineCall()}
            />
          )}

          <IconButton
            width="20px"
            colorScheme="red"
            aria-label="Call Segun"
            size="md"
            mx={1}
            icon={<CallEndIcon />}
            // onClick={(event) => declineCall()}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default CallVideo