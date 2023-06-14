const asyncHandler = require("express-async-handler");
const Message = require("../database/messageModel");
const User = require("../database/userModel");
const Chat = require("../database/chatModel");

const sendMessage = asyncHandler(async (req, res) => {
  const { content, chatId } = req.body;

  if (!content || !chatId) {
    return res.sendStatus(400);
  }

  var newMessage = {
    sender: req.user._id,
    content: content,
    chat: chatId,
  };

  try {
    var message = await Message.create(newMessage);

    message = await message.populate("sender", "firstname picture");
    message = await message.populate("chat");
    message = await User.populate(message, {
      path: "chat.users",
      select: "firstname email",
    });

    await Chat.findByIdAndUpdate(req.body.chatId, {
      latestMessage: message,
    });

    res.json(message);
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});

const allMessages = asyncHandler(async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "firstname picture email")
      .populate("chat");

    res.json(messages);
  } catch (error) {
    res.send(400);
    throw new Error(error);
  }
});

module.exports = { sendMessage, allMessages };
