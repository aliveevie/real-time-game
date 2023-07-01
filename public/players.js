const http = require('http');
const socketIO = require('socket.io');
const app = require('../server');

const server = http.createServer(app);
const io = socketIO(server);

const players = [];

io.on('connection', (socket) => {
  // Handle new player joining the game
  const player = {
    id: socket.id,
    x: 0,
    y: 0,
  };
  players.push(player);

  // Emit game data to the newly connected player
  socket.emit('gameData', { players });

  // Listen for player movement events
  socket.on('playerMove', ({ x, y }) => {
    // Update player position
    player.x = x;
    player.y = y;

    // Broadcast updated player position to all connected players
    io.emit('playerPositionUpdate', { playerId: player.id, x, y });
  });

  // Handle player disconnection
  socket.on('disconnect', () => {
    // Remove the player from the players array
    const playerIndex = players.findIndex((p) => p.id === socket.id);
    if (playerIndex !== -1) {
      players.splice(playerIndex, 1);
    }
  });
});

module.exports = {
  server,
  io
};
