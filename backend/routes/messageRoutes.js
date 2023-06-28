const express = require('express')
const {protect} = require('./middleware');
const {sendMessage,allMessages, updateMessage} = require("../controllers/messageController");

const router = express.Router();

router.route('/').post(protect, sendMessage);
router.route("/:chatId").get(protect,allMessages);
router.route("/update").put(protect,updateMessage);

module.exports = router;