import express from "express";
import path from "path";
import dns from "dns";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { connectDB } from "./lib/db.js";
import { ENV } from "./lib/env.js";

dns.setServers(["8.8.8.8", "8.8.4.4"]);

const PORT = ENV.PORT || 3000;

const app = express();
const __dirname = path.resolve();

app.use(express.json()); // middleware to parse JSON request bodies

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

// make ready for deployment
if (ENV.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (_, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
}

app.listen(PORT, () => {
  console.log("Server is running on port 3000 lessgo");
  connectDB();
});
