import Peer from "simple-peer";
import io from "socket.io-client";
import React, { useEffect, useRef, useState } from "react";
import { Button, IconButton, Input, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { PhoneIcon } from "@chakra-ui/icons";
import { ChatState } from "../context/ChatProvider";

const socket = io.connect("http://localhost:5000");

function VideoCall() {
  // const [me, setMe] = useState("");
  const [stream, setStream] = useState(null);
  const [receivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState(null);
  const [callerSignal, setCallerSignal] = useState(null);
  const [callEnded, setCallEnded] = useState(false);
  const [callAccepted, setCallAccepted] = useState(false);
  const [idToCall, setIdToCall] = useState("");
  const [name, setName] = useState("");


  const { user,selectedChat } = ChatState();


  console.log(user._id);
  console.log(selectedChat.users);
  
  const myVideo = useRef(null);
  const userVideo = useRef(null);
  const connectionRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setStream(stream);
        if (myVideo.current) {
          myVideo.current.srcObject = stream;
        }
      });

    socket.on("callUser", (data) => {
      setReceivingCall(true);
      setCaller(data.from);
      setName(data.name);
      setCallerSignal(data.signal);
    });
  }, []);

  const callUser = (id) => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream,
    });

    peer.on("signal", (data) => {
      socket.emit("callUser", {
        userToCall: id,
        signalData: data,
        from: user._id,
        name: user.firstname,
      });
    });

    peer.on("stream", (stream) => {
      if (userVideo.current) {
        userVideo.current.srcObject = stream;
      }
    });

    socket.on("callAccepted", (signal) => {
      setCallAccepted(true);
      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const answerCall = () => {
    setCallAccepted(true);
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });

    peer.on("signal", (data) => {
      socket.emit("answerCall", { signal: data, to: caller });
    });

    peer.on("stream", (stream) => {
      if (userVideo.current) {
        userVideo.current.srcObject = stream;
      }
    });

    peer.signal(callerSignal);

    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);
    connectionRef.current.destroy();
    navigate("/chats");
  };

  return (
    <>
      <h1>VideoCall</h1>
      <div className="container">
        <div className="video-container">
          <div className="video">
            {stream && (
              <video ref={myVideo} autoPlay muted style={{ width: "300px" }} />
            )}
          </div>

          <div className="video">
            {callAccepted && !callEnded && (
              <video ref={userVideo} autoPlay style={{ width: "300px" }} />
            )}
          </div>
        </div>

        <div className="myId">
          <Input
            id="filled-basic"
            placeholder="Name"
            display="hidden"
            bg="gray.200"
            value={user.firstname}
            onChange={(e) => setName(e.target.value)}
          />

          <Text>{user._id}</Text>

          <Input
            id="filled-basic"
            placeholder="ID to Call"
            display="hidden"
            bg="gray.200"
            value={idToCall}
            onChange={(e) => setIdToCall(e.target.value)}
          />

          <div className="call-button">
            {callAccepted && !callEnded ? (
              <Button onClick={leaveCall}>End Call</Button>
            ) : (
              <IconButton onClick={() => callUser(idToCall)}>
                <PhoneIcon />
              </IconButton>
            )}
          </div>
        </div>

        <div>
          {receivingCall && !callAccepted && (
            <div className="caller">
              <h1>{selectedChat.users[1].firstname} is calling...</h1>
              <Button onClick={answerCall}>Answer</Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default VideoCall;
