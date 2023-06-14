const express = require("express");

const {registerUser,userLogin} = require("../Controller/userController");

const router = express.Router();

router.post("/signup", registerUser);

router.post("/signin", userLogin);

module.exports = router;