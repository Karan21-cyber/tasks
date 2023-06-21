const express = require("express");
const { protect } = require("./middleware");

const {
  registerUser,
  userLogin,
  allUser,
} = require("../controllers/userController");

const router = express.Router();

router.route("/").get(protect, allUser);
router.route("/register").post(registerUser);
router.route("/login").post(userLogin);

module.exports = router;
