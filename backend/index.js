require("dotenv").config({
  path: [".env.development", ".env.development.local"],
});

const express = require("express");
const app = express();
const { createServer } = require("http");
const httpServer = createServer(app);
const { Server } = require("socket.io");

const port = process.env.PORT || 5000;

const cors = require("cors");
const userRouter = require("./routes/User");
const chatRouter = require("./routes/Chat");
const {
  verifyToken,
  authenticateSocket,
} = require("./middlewares/Authentication");
const mongoose = require("mongoose");
const { saveMessage } = require("./services/Message");
const { setCurrentlyActive, decreaseActiveNow } = require("./controllers/Chat");
const mongodbUrl = process.env.MONGODB_URL;

mongoose
  .connect(mongodbUrl)
  .then(() => console.log("Connected to MONGODB"))
  .catch((error) => console.log(error));

const io = new Server(httpServer, {
  cors: {
    origin: ["http://localhost:5173"],
  },
});

io.use(authenticateSocket);
io.use(setCurrentlyActive);

app.set("io", io);

io.on("connection", async (socket) => {
  //join to the default chat group

  await socket.join("defaultGroup");

  //broadcast to all clients
  io.to("defaultGroup").emit("onlineUsersCount", socket.currentlyActive);

  socket.on("disconnect",async () => {
    const online = await decreaseActiveNow();
    io.to("defaultGroup").emit("onlineUsersCount", online);
    socket.leave("defaultGroup");
  });

  socket.on("sendMessage", async (message) => {
    const savedMessage = await saveMessage(socket.user, message);
    io.to("defaultGroup").emit("recentMessage", savedMessage);
  });

  socket.on("typing", (state) => {
    io.to("defaultGroup").emit("typing", { state: state, by: socket.user });
  });
});

const corsOptions = {
  origin: "http://localhost:5173",
  "Access-Control-Allow-Credential": true,
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/kurakani/user", userRouter);
app.use("/api/kurakani/chat", verifyToken, chatRouter);

httpServer.listen(port, () => console.log(`Server started in port ${port}`));

function getOnlineUsers() {
  const online = io.sockets.adapter.rooms.get("defaultGroup")?.size || 0;
  return online;
}
