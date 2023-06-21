const express = require("express");
const dbconnect = require("./database/db");
const cors = require("cors");
const app = express();

const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRouter = require("./routes/messageRoutes");

app.use(cors());
app.use(express.json());

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRouter);

const server = app.listen(5000, () => {
  console.log("Server is running on port 5000");
});

const io = require("socket.io")(server, {
  pingTimeout: 50000,
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  console.log("Connected to socket.io");

  socket.on("setup", (user) => {
    socket.join(user._id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User joined room: " + room);
  });

  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("new message", (newMessageReceived) => {
    const chat = newMessageReceived.chat;

    if (!chat.users) {
      console.log("chat.users not defined");
      return;
    }

    chat.users.forEach((user) => {
      if (user._id === newMessageReceived.sender._id) {
        return;
      }
      socket.in(user._id).emit("message received", newMessageReceived);
    });
  });

  // video chat

  socket.emit("me", socket.id);

  socket.on("disconnect", () => {
    socket.broadcast.emit("callEnded");
  });

  socket.on("callUser", (room) => {
    socket.in(room.userToCall).emit("callUser", {
      signal: room.signalData,
      from: room.from,
      name: room.name,
    });
  });

  socket.on("answerCall", (room) => {
    socket.in(room.to).emit("callAccepted", room.signal);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
    socket.leaveAll();
  });

});

