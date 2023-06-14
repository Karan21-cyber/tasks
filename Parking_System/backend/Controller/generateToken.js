const jwt = require("jsonwebtoken");
const jwtkey = "parkingsystem";

const generateToken = (id) => {
  return jwt.sign({ id }, jwtkey, {
    expiresIn: "30d",
  });
};

// console.log(generateToken("647b941d7923db84ac14f08f"));

module.exports = generateToken;
