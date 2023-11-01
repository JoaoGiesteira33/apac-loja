const http = require('http');
const express = require('express');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server,{
  cors: {
    origin: "http://localhost:5173"
  },
  connectionStateRecovery: {}
});

const PORT = process.env.PORT || 3000;

io.listen(PORT);

console.log('Server listening on port ' + PORT);

io.on('connection', (socket) => {
    console.log('A user connected');
    
    // Handle chat events here
    socket.on('chat message', (message) => {
        console.log('message: ' + message);
        io.emit('chat message', "Cala-te puta");
    });
});

io.on('disconnect', () => {
    console.log('A user disconnected');
});

