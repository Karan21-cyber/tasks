const jwt = require("jsonwebtoken");
const User = require("../database/userModel");
const asyncHandler = require("express-async-handler");
const jwtkey = "chatapp";

const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      // decodes token id
      const decode = jwt.verify(token, jwtkey);
      req.user = await User.findById(decode.id).select("-password");

      next();
    } catch (error) {
      res.status(401);
      throw new Error("Now authorized, token failde");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

module.exports = { protect };
