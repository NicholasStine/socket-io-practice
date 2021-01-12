const express = require("express");
const cors = require("cors");
const http = require("http");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 5000;
var messages = [""];

const server = http.createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
  }
});

app.use(express.json({ extended: true }));
app.use(cors());

server.listen(8080);

app.get("/", () =>{
  console.log("Home");
})

io.on('connection', (socket) => {

  console.log("Connected!");
  socket.emit('first', socket.id);  

  socket.on("send-message", message => {
    console.log(`Server Message Method: ${message}`);
    socket.broadcast.emit("recieve-message", [...message]);
  });

});


app.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}`));