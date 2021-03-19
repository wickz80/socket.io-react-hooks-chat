const server = require("http").createServer();
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

const PORT = 4000;
const NEW_CHAT_MESSAGE_EVENT = "newChatMessage";

let messageHistory = []

io.on("connection", (socket) => {
  console.log(`Client ${socket.id} connected`);
  
  messageHistory.forEach(msg => {
    io.emit(NEW_CHAT_MESSAGE_EVENT, msg)
  })

  // Listen for new messages
  socket.on(NEW_CHAT_MESSAGE_EVENT, (data) => {
    messageHistory.push(data)
    if (messageHistory.length >= 10) {
      messageHistory = messageHistory.slice(-10)
    }
    io.emit(NEW_CHAT_MESSAGE_EVENT, data);
  });

  socket.on("disconnect", () => {
    console.log(`Client ${socket.id} diconnected`);
  });
});

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
