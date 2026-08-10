import jwt from "jsonwebtoken";

import { ENV } from "./env.js";

export const generateToken = (userId, res) => {
  const { JWT_SECRET } = ENV;
  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not set");
  }

  const token = jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("token", token, {
    httpOnly: true, // prevent XSS attacks: cross-site scripting
    secure: ENV.NODE_ENV === "production",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in MS
    sameSite: "strict", // prevent CSRF attacks
  });

  return token;
};
