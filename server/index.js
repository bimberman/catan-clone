require('dotenv/config');
const express = require('express');

const db = require('./database');
const ClientError = require('./client-error');

const staticMiddleware = require('./static-middleware');
const sessionMiddleware = require('./session-middleware');

const app = express();
const http = require('http')
const server = http.createServer(app);
const socketIo = require('socket.io')
const io = socketIo(server);
const index = require("./routes/socket-test");


app.use(staticMiddleware);
app.use(sessionMiddleware);

app.use(express.json());

let interval;

io.on("connection", (socket) => {
  console.log("New client connected");
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => getApiAndEmit(socket), 1000);
  socket.on("disconnect", () => {
    console.log("Client disconnected");
    clearInterval(interval);
  });
});

const getApiAndEmit = socket => {
  const response = new Date();
  // Emitting a new message. Will be consumed by the client
  socket.emit("FromAPI", response);
};

server.listen(process.env.DEV_SERVER_PORT || 3001, () => {
  // eslint-disable-next-line no-console
  console.log('Socket listening on port', process.env.DEV_SERVER_PORT || 3001);
});

// /api/health-check/ route
const healthCheck = require('./routes/health-check');
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

app.listen(process.env.DEV_SERVER_PORT || 3001, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port', process.env.DEV_SERVER_PORT || 3001);
});
