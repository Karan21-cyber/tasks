const express = require("express");

const { registerUser, userLogin,allUser } = require("../controllers/userController");

const router = express.Router();

router.get("/", allUser);

router.post("/register", registerUser);

router.post("/login", userLogin);


module.exports = router;
