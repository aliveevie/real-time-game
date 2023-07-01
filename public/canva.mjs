// Get the canvas elements
let canvas = document.getElementById("game-window");

// Get the 2D rendering content
let ctx = canvas.getContext("2d");

// Player Variables
let playerX = canvas.width / 2;
let playerY = canvas.height - 50;
let playerSize = 20;

// Ball Variables
let ballX = canvas.width / 2;
let ballY = 50;
let ballSize = 10;
let ballSpeed = 2;

// Controls Variables
let leftPressed = false;
let rightPressed = false;
let upPressed = false;
let downPressed = false;

// Send request to join the game
socket.emit('joinGame');

// Listen for game data updates
socket.on('gameData', ({ players }) => {
  // Update game state with received data
});

// Listen for player position updates
socket.on('playerPositionUpdate', ({ playerId, x, y }) => {
  // Update player position in the game state
});

// Emit player movement events
function movePlayer(x, y) {
  socket.emit('playerMove', { x, y });
}

// Event listeners for key presses
document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);

function keyDownHandler(event) {
  if (event.key === "ArrowUp" || event.key === "w") {
    upPressed = true;
  } else if (event.key === "ArrowDown" || event.key === "s") {
    downPressed = true;
  } else if (event.key === "ArrowLeft" || event.key === "a") {
    leftPressed = true;
  } else if (event.key === "ArrowRight" || event.key === "d") {
    rightPressed = true;
  }
}

function keyUpHandler(event) {
  if (event.key === "ArrowUp" || event.key === "w") {
    upPressed = false;
  } else if (event.key === "ArrowDown" || event.key === "s") {
    downPressed = false;
  } else if (event.key === "ArrowLeft" || event.key === "a") {
    leftPressed = false;
  } else if (event.key === "ArrowRight" || event.key === "d") {
    rightPressed = false;
  }
}

function drawPlayer() {
  ctx.beginPath();
  ctx.rect(playerX, playerY, playerSize, playerSize);
  ctx.fillStyle = "blue";
  ctx.fill();
  ctx.closePath();
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(ballX, ballY, ballSize, 0, Math.PI * 2);
  ctx.fillStyle = "red";
  ctx.fill();
  ctx.closePath();
}

function movePlayer() {
  if (leftPressed && playerX > 10) {
    playerX -= 5;
  } else if (rightPressed && playerX + playerSize < canvas.width - 10) {
    playerX += 5;
  }
  if (upPressed && playerY > 50) {
    playerY -= 5;
  } else if (downPressed && playerY + playerSize < canvas.height - 10) {
    playerY += 5;
  }
}

let count = 0

function moveBall() {
  
  if (
    ballX + ballSize > playerX &&
    ballX - ballSize < playerX + playerSize &&
    ballY + ballSize > playerY &&
    ballY - ballSize < playerY + playerSize
  ) {
    ballX = getRandomX();
    ballY = getRandomY();
    count += 1
  }
}



function drawText() {
  ctx.font = "12px 'Press Start 2P'";
  ctx.fillStyle = "white";
  ctx.textAlign = "left";

  const controlsText = "Controls: WASD";
  const coinRaceText = "Coin Race";
  const rankText = "Rank: 1/1";
  const points = count; // Retrieve the value of the count variable

  const textX = 10; // X coordinate for the left-aligned text
  const rankPointsX = canvas.width - 10; // X coordinate for the right-aligned rank and points text

  // Draw Controls text
  ctx.fillText(controlsText, textX, 30);

  // Draw Coin Race text
  const coinRaceTextWidth = ctx.measureText(coinRaceText).width;
  const coinRaceTextX = (canvas.width - coinRaceTextWidth) / 2; // Centered horizontally
  ctx.fillText(coinRaceText, coinRaceTextX, 30);

  // Draw Rank text
  const rankTextWidth = ctx.measureText(rankText).width;
  const rankTextX = rankPointsX - rankTextWidth; // Right-aligned
  ctx.fillText(rankText, rankTextX, 30);

  // Draw Points text
  const pointsText = `Points: ${points}`;
  const pointsTextWidth = ctx.measureText(pointsText).width;
  const pointsTextX = rankTextX - pointsTextWidth - 10; // Right-aligned before the rank text
  ctx.fillText(pointsText, pointsTextX, 30);
}


function drawBorder() {
  const textHeight = 40; // Height of the text
  const borderHeight = canvas.height - textHeight - 5; // Calculate the remaining height for the border

  ctx.strokeStyle = "white";
  ctx.lineWidth = 2;
  ctx.strokeRect(5, textHeight, canvas.width - 10, borderHeight);
}







function getRandomX() {
  const borderThickness = 10; // Adjust this value according to your border thickness
  return Math.random() * (canvas.width - ballSize * 2 - borderThickness);
}

function getRandomY() {
  const textHeight = 40; // Adjust this value according to your border thickness
  const borderThickness = 10;
  return Math.random() * (canvas.height - ballSize * 2 - borderThickness * 2 - textHeight) + borderThickness + ballSize + textHeight;
}





function draw() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Move the player
  movePlayer();

  // Move the ball
  moveBall();

  // Draw the player
  drawPlayer();

  // Draw the ball
  drawBall();

  // Draw Text
  drawText()

  // Draw the border
  drawBorder()

  // Call the draw function again to create an animation loop
  requestAnimationFrame(draw);
}


// Start the game
draw();
