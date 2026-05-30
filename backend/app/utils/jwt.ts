import jwt from "jsonwebtoken";

type payload = {
  email: string;
  username: string;
};

const jwtSecret = process.env.JWT_SECRET || "7039457skna(^*^(*&^%$#@!";

function getAccessToken(user: payload): string {
  return jwt.sign(user, jwtSecret, { expiresIn: "2d" });
}

function verifyAccessToken(token: string): payload | null {
  try {
    const decoded = jwt.verify(token, jwtSecret) as payload;
    return decoded;
  } catch (error) {
    return null;
  }
}

export { getAccessToken, verifyAccessToken };