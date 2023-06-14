const express = require('express');
const dbconnect = require('./database/db')
const cors = require("cors");
const app = express();

const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRouter = require("./routes/messageRoutes");

const generateToken = require("./controllers/generateToken");

app.use(express.json());  // to accept json data
app.use(cors());


app.use("/api/user",userRoutes);

app.use("/api/chat",chatRoutes);

app.use("/api/message",messageRouter);

const server = app.listen(5000);

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  console.log("Connected to socket.io");

  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User joined room: " + room);
  });

  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("new message", (newMessageReceived) => {
    var chat = newMessageReceived.chat;

    if(!chat.users){
        return console.log('chat.users not defined');
    }

    chat.users.forEach(user => {
        if(user._id === newMessageReceived.sender._id){
            return;
        }

        socket.in(user._id).emit("message received", newMessageReceived);
    });

  });

  socket.off("setup", () => {
    console.log("User disconnected");
    socket.leave(userData._id);
  })

});
