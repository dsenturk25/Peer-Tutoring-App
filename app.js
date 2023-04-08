
const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const session = require("express-session");
const dotenv = require("dotenv");
const path = require("path");
const bodyParser = require("body-parser");
const favicon = require("serve-favicon");
const Chat = require("./models/Chat/chat");

const app = express();

const server = http.createServer(app);
const PORT = process.env.PORT || 3000;

const mongoUri = "mongodb://127.0.0.1:27017/peer-tutoring-app";
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//yorum
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(express.static(path.join(__dirname, "public")));
// app.use(favicon(path.join(__dirname, "public", "favicon.ico")));

dotenv.config({ path: path.join(__dirname, ".env") });

app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });

  socket.on('chat message', (msg) => {
    console.log(`Message received: ${msg}`);
    const chat = new Chat({ sender: msg.sender, message: msg.message });
    chat.save((err, msg) => {
      if (err) return console.error(err);
      io.emit('chat message', msg);
    });
  });
});

server.listen(PORT, () => {
  console.log("Server is listening on port", PORT);
})
