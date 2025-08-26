import express from "express";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { createServer } from "node:http";
import { Server } from "socket.io";

const app = express();
const server = createServer(app);
const io = new Server(server);

const port = 3000;

// yaha __filename use karke sahi __dirname banate hai
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// agar aapke html file "public/index.html" me hai
app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "public", "index.html"));
});

// socket.io
io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("chat message", (msg) => {
    console.log("message: " + msg);
    io.emit("chat message", msg); // sab clients ko bhej do
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
