import express from "express";
import cors from "cors";
import path from "path";
import { Server } from "socket.io";
import indexRoutes from "./routes/indexRoutes.js";
import constant from "./config/constant.js";
import db from "./config/db.js";

const app = express();
const port = constant.PORT;

// CORS policy
app.use(cors());

// Parse JSON data / urlencoded data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// For static files
app.use(express.static(path.resolve("public")));

// Create Server
const server = app.listen(port, (error) => {
  if (error) {
    console.error("Server not started!");
  } else {
    console.log(`Server is running on port ${port}.`);
    db();
  }
});

// Initialize Socket.IO
const io = new Server(server);

io.on("connection", (socket) => {
  console.log(`A user connected ${socket.id}`);

  // send message and recieve message
  socket.on("send_message", (data) => {
    socket.broadcast("recieve_message", data);
  });
});

// Routing
app.use("/api", indexRoutes);

