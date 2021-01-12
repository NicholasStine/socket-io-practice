// imports
const express = require("express");
const cors = require("cors");
const http = require("http");

// Express Config
const app = express();
require("dotenv").config();
const express_port = process.env.PORT || 5000;
const socket_port = process.env.SOCKET || 8080;


// Socket.io Config
const server = http.createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
  }
});
server.listen(process.env.SOCKET, () => {
  console.log(`Socket.io \t port ::: ${process.env.SOCKET}`);
});

// App Config
app.use(express.json({ extended: true }));
app.use(cors());

// Express Routes
app.get("/", () =>{
  console.log("Home");
})

// Socket.io Routes
io.on('connection', (socket) => {

  console.log("Connected!");
  socket.emit('first', socket.id);  

  socket.on("send-message", messsage => {
    console.log(`Server Message Method: ${message}`);
    socket.broadcast.emit("recieve-message", message);
  });
});

// Start the SerVeR!
app.listen(process.env.PORT, () => console.log(`Express \t port ::: ${process.env.PORT}`));