const httpServer = require("http").createServer();
const Redis = require("ioredis");
const redisClient = new Redis(6379,"redis");
const io = require("socket.io")(httpServer, {
  cors: {
    origin: "http://localhost:5173",
  },
  adapter: require("socket.io-redis")({
    pubClient: redisClient,
    subClient: redisClient.duplicate(),
  }),
});

const { setupWorker } = require("@socket.io/sticky");
const crypto = require("crypto");
const randomId = () => crypto.randomBytes(8).toString("hex");

const { RedisSessionStore } = require("./sessionStore");
const sessionStore = new RedisSessionStore(redisClient);

const { RedisMessageStore } = require("./messageStore");
const messageStore = new RedisMessageStore(redisClient);

const { send_email } =  require('./utils/utils');

function isOnList(list, username) {
  for (let i = 0; i < list.length; i++) {
    if (list[i].username === username) {
      return true;
    }
  }
}


io.use(async (socket, next) => {
  const sessionID = socket.handshake.auth.sessionID;
  const username = socket.handshake.auth.username;

  if (!username) {
    return next(new Error("invalid username"));
  }

  // create a new session
  socket.sessionID = sessionID || randomId();
  socket.username = username;
  next();
});

io.on("connection", async (socket) => {
  // persist session
  console.log("<<<<<<<<<<<<<<<<<<<<")
  console.log("Socket connected")
  console.log("Socket sessionID", socket.sessionID)
  console.log("Socket username", socket.username)

  sessionStore.saveSession(socket.sessionID, {
    username: socket.username,
    connected: true,
  });

  console.log("Socket session saved")

  // emit session details
  socket.emit("session", {
    sessionID: socket.sessionID,
  });

  // join the <username> room
  socket.join(socket.username);

  // fetch existing users
  const users = {};
  const [messages, sessions] = await Promise.all([
    messageStore.findMessagesForUser(socket.username),
    sessionStore.findAllSessions(),
  ]);
  const messagesPerUser = new Map();
  messages.forEach((message) => {
    const { from, to, date } = message;
    const otherUser = socket.username === from ? to : from;
    if (messagesPerUser.has(otherUser)) {
      messagesPerUser.get(otherUser).push(message);
    } else {
      messagesPerUser.set(otherUser, [message]);
    }
  });

  sessions.forEach((session) => {
    // tratar isto para remover repetidos (se 1 estiver 1, é o que ganha)
    if(session.username in users) {
      users[session.username]["connected"] = session.connected || 
                                             users[session.username].connected;
    }
    else{
      users[session.username] = {
        username: session.username,
        connected: session.connected,
        messages: messagesPerUser.get(session.username) || [],
      };  
      console.log(messagesPerUser.get(session.username))
    }
  });
  console.log("--------- Users ---------")
  const usernames = Object.keys(users);
  const sendingUsers = [];
  for (var key in usernames){
    sendingUsers.push(users[usernames[key]]);
  } 
  console.log(sendingUsers)
  console.log("--------- ---- ---------")
  socket.emit("users", sendingUsers);

  // notify existing users
  socket.broadcast.emit("user connected", {
    username: socket.username,
    connected: true,
    messages: [],
  });

  // forward the private message to the right recipient (and to other tabs of the sender)
  socket.on("private message", ({ content, to }) => {
    const message = {
      content,
      from: socket.username,
      to,
      date: new Date().toLocaleString(),
    };
    console.log(message.date)
    // sends to destiny and to sender (to update the chat)
    socket.to(to).to(socket.username).emit("private message", message);
    messageStore.saveMessage(message);
  });

  // notify users upon disconnection
  socket.on("disconnect", async () => {
    console.log("Socket disconnected:" + " " + socket.username)
    // mark user as disconnected
    const matchingSockets = await io.in(socket.username).allSockets();
    const isDisconnected = matchingSockets.size === 0;
    if (isDisconnected) {
      console.log("User disconnected:" + " " + socket.username)
      // notify other users
      socket.broadcast.emit("user disconnected", socket.username);
      // update the connection status of the session
      sessionStore.saveSession(socket.sessionID, {
        username: socket.username,
        connected: false,
      });
    }
  });

  // send email if user is offline
  socket.on("send email", async ({ email, subject, text }) => {
    console.log("Sending email to:" + " " + email)
    console.log("Subject:" + " " + subject)
    console.log("Text:" + " " + text)
    await send_email(email, subject, text);

    socket.emit("email sent");
  });

  socket.on("connection_error", (err) => {
    console.log(err.req);      // the request object
    console.log(err.code);     // the error code, for example 1
    console.log(err.message);  // the error message, for example "Session ID unknown"
    console.log(err.context);  // some additional error context
  });

  console.log(">>>>>>>>>>>>>>>>>>>>")
});






setupWorker(io);
