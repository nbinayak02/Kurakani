const JWT = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

function createToken(user) {
  const payload = {
    _id: user._id,
  };

  const token = JWT.sign(payload, secret);

  return token;
}

module.exports = {
  createToken,
};
