import type { ExtendedError, Socket } from "socket.io";
import { verifyAccessToken } from "../utils/jwt.js";
import { BadRequestError, ForbiddenError } from "../errors/customErrors.js";

const authenticateSocket = (
  socket: Socket,
  next: (err?: ExtendedError) => void,
) => {
  const token = socket.handshake.auth.token;

  if (!token) {
    const error = new BadRequestError("Token not found in Socket Connection");
    next(error);
  }

  const isTokenValid = verifyAccessToken(token);

  if (!isTokenValid) {
    const error = new ForbiddenError("Invalid token");
    next(error);
  }

  next();
};

export default authenticateSocket;