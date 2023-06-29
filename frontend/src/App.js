import './App.css';
import {Route, Routes} from "react-router-dom";
import Home from "./components/Homepage";
import Chat from "./components/Chatpage";
import CallVideo from './components/CallVideo';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/chats" element={<Chat />} />
      <Route path="/videocall/:roomId" element={<CallVideo />} />
    </Routes>
  );
}

export default App;
