const jwt = require("jsonwebtoken");
const Config = require("../config");

function generateAuthToken(user) {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
    },
    Config.JWT.secret
  );
}

module.exports = { generateAuthToken };
