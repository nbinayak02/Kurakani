const JWT = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader)
    return res.status(400).json({ message: "Authorization header not found" });

  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(400).json({ message: "No token found" });

  JWT.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    } else {
      req.user = decoded;
    }
    next();
  });
};

const authenticateSocket = (socket, next) => {
  const token = socket.handshake.auth.token;

  if (!token) {
    const error = new Error("Token not found in Socket Connection");
    next(error);
  }

  JWT.verify(token, secret, (err, decoded) => {
    if (err) {
      const error = new Error("Invalid token received from Socket Connection");
      next(error);
    } else {
      socket.user = decoded;
      next();
    }
  });
};

module.exports = { verifyToken, authenticateSocket };
