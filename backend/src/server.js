import express from "express";
import path from "path";
import dns from "dns";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { connectDB } from "./lib/db.js";
import { ENV } from "./lib/env.js";
import { app, server } from "./lib/socket.js";

dns.setServers(["8.8.8.8", "8.8.4.4"]);

const PORT = ENV.PORT || 3000;

const __dirname = path.resolve();

app.use(express.json({ limit: "5mb" })); // middleware to parse JSON request bodies
app.use(cors({ origin: ENV.CLIENT_URL, credentials: true }));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

// make ready for deployment
if (ENV.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (_, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
}

// app.listen(PORT, () => {
//   console.log("Server is running on port 3000 lessgo");
//   connectDB();
// });

const startServer = async () => {
  await connectDB();

  server.listen(PORT, () => {
    console.log("Server is running on port", PORT);
  });
};

startServer();
