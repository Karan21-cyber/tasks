import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [selectedChat, setSelectedChat] = useState();
  const [chats, setChats] = useState([]);
  const [calling, setCalling] = useState(false);
  const [videoLink, setVideoLink] = useState();
  const [messageId, setMessageId] = useState();
  const [callerName,setCallerName] = useState();
  const [senderId , setSenderId] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    setUser(userInfo);

    if (!userInfo) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <ChatContext.Provider
      value={{
        user,
        setUser,
        selectedChat,
        setSelectedChat,
        chats,
        setChats,
        calling,
        setCalling,
        videoLink,
        setVideoLink,
        messageId,
        setMessageId,
        setCallerName,
        callerName,
        senderId,
        setSenderId,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

// make state accessible to all the pages
export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;
