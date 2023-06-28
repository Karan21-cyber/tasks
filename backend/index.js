const express = require("express");
const dbconnect = require("./database/db");
const cors = require("cors");
const app = express();
const { v4: uuidV4 } = require("uuid");

const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRouter = require("./routes/messageRoutes");

app.use(cors());
app.use(express.json());

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRouter);


// receiving the roomId
app.get("/api/videocall", (req, res) => {
  res.redirect(`/${uuidV4()}`);
});

app.get("/:room", (req, res) => {
  // res.render("room", { roomId: req.params.room });
  res.send({roomId:req.params.room});
  // res.json("room" , {roomId:req.params.room});
});

const PORT = 5000;
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
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

  // for video chat
  socket.on("join-room", (roomId, userId) => {
    // console.log(roomId, userId);
    socket.join(roomId);

    socket.to(roomId).emit("user-connected", userId);

    socket.on("disconnect", () => {
      io.to(roomId).emit("user-disconnected", userId);
    });
  });

});

