const express = require('express');
const {accessChat,fetchChats,createGroup,renameGroup,removeGroup,addtoGroup,removeFromGroup} = require("../controllers/chatController")
const router = express.Router();
const {protect} = require("./middleware");

router.route("/").post(protect,accessChat);
router.route("/").get(protect,fetchChats);
router.route("/group").post(protect,createGroup);
router.route("/rename").put(protect,renameGroup);
router.route("/remove").delete(protect,removeGroup);

router.route("/addgroup").put(protect,addtoGroup);
router.route("/removegroup").put(protect,removeFromGroup);


module.exports = router;