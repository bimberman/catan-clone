require('dotenv/config');
const express = require('express');
const NEW_CHAT_MESSAGE_EVENT = "newChatMessage";

const db = require('./database');
const ClientError = require('./client-error');

const staticMiddleware = require('./static-middleware');
const sessionMiddleware = require('./session-middleware');

const app = express();
const http = require('http')
const server = http.createServer(app);
const socketIo = require('socket.io')
const io = socketIo(server);

app.use(staticMiddleware);
app.use(sessionMiddleware);

app.use(express.json());

// Run when client connects
io.on("connection", (socket) => {

  console.log(socket);
  // Join a conversation
  const { roomId } = socket.handshake.query;
  socket.join(roomId);

  // Listen for new messages
  socket.on(NEW_CHAT_MESSAGE_EVENT, (data) => {
    io.in(roomId).emit(NEW_CHAT_MESSAGE_EVENT, data);
  });

  // Leave the room if the user closes the socket
  socket.on("disconnect", () => {
    socket.leave(roomId);
  });
});

  server.listen(process.env.DEV_SERVER_PORT || 3001, () => {
    // eslint-disable-next-line no-console
    console.log('Listening on port', process.env.DEV_SERVER_PORT || 3001);
  });

  // /api/health-check/ route
  const healthCheck = require('./routes/health-check');
const { Socket } = require('dgram');
  app.use(healthCheck);

  app.use('/api', (req, res, next) => {
    next(new ClientError(`cannot ${req.method} ${req.originalUrl}`, 404));
  });

  app.use((err, req, res, next) => {
    if (err instanceof ClientError) {
      res.status(err.status).json({ error: err.message });
    } else {
      console.error(err);
      res.status(500).json({
        error: 'an unexpected error occurred'
      });
    }
  });
