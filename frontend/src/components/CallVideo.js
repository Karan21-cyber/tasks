import React, { useEffect, useState } from 'react'
import io from 'socket.io-client';
// import Peer from "simple-peer";
import {Peer} from "peerjs"
import { useParams } from 'react-router-dom';
import { ChatState } from '../context/ChatProvider';


const ENDPOINT = "http://localhost:5000";
var socket;

function CallVideo() {

 const {user} = ChatState();
 const params = useParams();
 
const videoGrid = document.getElementById("video-grid");
const myVideo = document.createElement("video");
myVideo.muted = true;

 const id = user._id;
 const roomId = params.roomId;
 const myPeer = new Peer();

 const peers = [];
  // console.log(roomId);
  // console.log(id);

  useEffect(() => {
    socket = io(ENDPOINT);

    navigator.mediaDevices.getUserMedia({
      video:true,
      audio:true
    }).then(stream => {
      addVideoStream(myVideo,stream);

      myPeer.on('call', call => {
        call.answer(stream);
        const video = document.createElement('video');
        call.on('stream' , userVideoStream => {
          addVideoStream(video, userVideoStream);
        })
      })

      socket.on("user-connected", userId => {
          connectToNewUser(userId, stream);
      });

    });

    socket.on('user-disconnected' , userId => {
      console.log(userId);
      if(peers[userId]) peers[userId].close();
    })

    myPeer.on('open', id => {
      socket.emit('join-room', roomId , id);
    })

    socket.on('user-connected', userId => {
      console.log('user connected :' + userId);
    })
   
  },[]);


  const addVideoStream = (video, stream) =>{
    video.srcObject = stream;
    video.addEventListener('loadedmetadata', () => {
      video.play();
    })
    videoGrid.append(video);
  }


  const connectToNewUser = (userId , stream) => {
    const call = myPeer.call(userId, stream);
    const video = document.createElement('video');
    call.on('stream' , userVideoStream => {
      addVideoStream(video, userVideoStream);
    })
    call.on('close', () => {
      video.remove();
    })
  }

 
  return (
    <div id="video-grid">

    </div>
  )
}

export default CallVideo