import React, { useEffect, useState } from "react";
import { ChatState } from "../context/ChatProvider";
import {
  Box,
  FormControl,
  IconButton,
  Input,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { getSender, getSenderFull } from "./getSender";
import Profile from "./Profile";
import UpdateGroupChatModal from "./UpdateGroupChatModal";
import axios from "axios";
import ScrollableChat from "./ScrollableChat";
import Lottie from "react-lottie";
import animationData from "../assets/typing.json";
import { FaVideo } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import io from "socket.io-client";

const ENDPOINT = "http://localhost:5000";
var socket, selectedChatCompare;

function SingleChat({ fetchAgain, setFetchAgain }) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [videoId, setVideoId] = useState();

  const navigate = useNavigate();

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
  };

  const { user, selectedChat,setCallerName, setSelectedChat, setVideoLink, setMessageId,setSenderId } =
    ChatState();

  const fetchMessages = async () => {
    if (!selectedChat) {
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      setLoading(true);

      const { data } = await axios.get(
        `http://localhost:5000/api/message/${selectedChat._id}`,
        config
      );

      const index = data.length-1;
      setMessages(data);
      setLoading(false);
      setVideoLink(data[index].content);
      setMessageId(data[index]._id);
      setCallerName(data[index].sender.firstname);
      setSenderId(data[index].chat.users[1]._id);
      
      
      socket.emit("join chat", selectedChat._id);
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connected", () => setSocketConnected(true));
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));
  });

  useEffect(() => {
    fetchMessages();
    selectedChatCompare = selectedChat;
  }, [selectedChat]);

  useEffect(() => {
    socket.on("message received", (newMessageReceived) => {
      if (
        !selectedChatCompare ||
        selectedChatCompare._id !== newMessageReceived.chat._id
      ) {
        // give Notification
      } else {
        setMessages([...messages, newMessageReceived]);
      }
    });
  });

  const sendMessage = async (event) => {
    if ((event.key === "Enter" && newMessage) || (event.type === "click" && newMessage)){
      socket.emit("stop typing", selectedChat._id);
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };
        
        setNewMessage("");
        const { data } = await axios.post(
          "http://localhost:5000/api/message",
          {
            content: newMessage,
            chatId: selectedChat._id,
          },
          config
        );

        socket.emit("new message", data);
        setMessages([...messages, data]);
      } catch (error) {
        return error;
      }
    }
  };

  const typingHandler = (e) => {
    setNewMessage(e.target.value);
    // typing indivator logic
    if (!socketConnected) return;

    if (!isTyping) {
      setTyping(true);
      socket.emit("typing", selectedChat._id);
    }

    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();

      var timeDiff = timeNow - lastTypingTime;

      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
  };

  // fetchVideo Id
  const fetchVideoId = async () => {
    const data = await axios.get("http://localhost:5000/api/videocall");
    setVideoId(data.data.roomId);
    // setNewMessage(`/videocall/${data.data.roomId}`);

  };

  // console.log(videoId);

  useEffect(() => {
    fetchVideoId();
  }, []);

const videoCallLink = async (newMessage) => {
  if(newMessage){
    socket.emit("stop typing", selectedChat._id);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };

      setNewMessage("");
      const { data } = await axios.post(
        "http://localhost:5000/api/message",
        {
          content: newMessage,
          chatId: selectedChat._id,
        },
        config
      );

      socket.emit("new message", data);
      setMessages([...messages, data]);

      // console.log("videoId:", videoId);
      navigate(`/videocall/${videoId}`);
    } catch (error) {
      return error;
    }
  }
};


  const handleCall = () => {
    videoCallLink(`Answer:${videoId}`)
  };


  return (
    <>
      {selectedChat ? (
        <>
          <Text
            fontSize={{ base: "20px", md: "25px" }}
            pb={3}
            px={2}
            width="100%"
            fontFamily="Work sans"
            display="flex"
            justifyContent={{ base: "space-between" }}
            alignItems="center"
          >
            <IconButton
              display={{ base: "felx", md: "none" }}
              icon={<ArrowBackIcon />}
              onClick={() => setSelectedChat("")}
            />

            {!selectedChat.isGroupChat ? (
              <>
                {getSender(user, selectedChat.users)}
                <IconButton
                  colorScheme="teal"
                  aria-label="Call Segun"
                  size="md"
                  mx={1}
                  icon={<FaVideo />}
                  onClick={(event) => handleCall()}
                />

                <Profile user={getSenderFull(user, selectedChat.users)} />
              </>
            ) : (
              <>
                {selectedChat.chatName.toUpperCase()}

                <IconButton
                  colorScheme="teal"
                  aria-label="Call Segun"
                  size="md"
                  mx={1}
                  icon={<FaVideo />}
                  onClick={(event) => handleCall()}
                />

                <UpdateGroupChatModal
                  fetchAgain={fetchAgain}
                  setFetchAgain={setFetchAgain}
                  fetchMessages={fetchMessages}
                />
              </>
            )}
          </Text>

          <Box
            display="flex"
            flexDirection="flex-end"
            padding={3}
            bg="#E8E8E8"
            width="100%"
            height="100%"
            borderRadius="lg"
            overflowY="hidden"
          >
            {/* Message Here */}

            {loading ? (
              <Spinner
                size="xl"
                width={20}
                height={20}
                alignSelf="center"
                margin="auto"
              />
            ) : (
              <div className="messages">
                <ScrollableChat messages={messages} />
                {isTyping && selectedChat ? (
                  <div>
                    <Lottie
                      options={defaultOptions}
                      width={70}
                      style={{ marginBottom: 15, marginLeft: 0 }}
                    />
                  </div>
                ) : (
                  <></>
                )}
              </div>
            )}
          </Box>
          <FormControl onKeyDown={sendMessage} isRequired mt={3}>
            <Input
              variant="filled"
              bg="#E8E8E8"
              placeholder="Enter a message..."
              onChange={typingHandler}
              value={newMessage}
            />
          </FormControl>
        </>
      ) : (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          height="100%"
        >
          <Text fontSize="2xl" fontFamily="Work sans">
            Click on a user to Start Chatting
          </Text>
        </Box>
      )}
    </>
  );
}

export default SingleChat;
