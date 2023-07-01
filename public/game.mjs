
const socket = io();
const canvas = document.getElementById("game-window");
const ctx = canvas.getContext("2d");

let playerX = canvas.width / 2;
let playerY = canvas.height - 50;
let playerSize = 20

let leftPressed = false;
let rightPressed = false;
let upPressed = false;
let downPressed = false;

// add event listeners for key press
document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);



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

// Create a function for the key event

function keyDownHandler(event){
    if(event.key === "ArrowLeft"){
        leftPressed = true
    }else if(event.key === "ArrowRight"){
        rightPressed = true
    }else if(event.key === "w"){
        upPressed = true
    }else if(event.key === "s"){
        downPressed = true
    }else if(event.key == "a"){
        leftPressed = true
    }else if(event.key == "d"){
        rightPressed = true
    }
}




function keyDownHandler(event){
    if(event.key === "ArrowLeft"){
        leftPressed = false
    }else if(event.key === "ArrowRight"){
        rightPressed = false
    }else if(event.key === "w"){
        upPressed = false
    }else if(event.key === "s"){
        downPressed = false
    }else if(event.key == "a"){
        leftPressed = false
    }else if(event.key == "d"){
        rightPressed = false
    }
}

function drawPlayer(){
    ctx.beginPath()
    ctx.rectangle(playerX, playerY, playerSize, playerSize)
    ctx.fillStyle = "blue"
    ctx.fill()
    ctx.closePath()
}

function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    if(leftPressed && playerX > 0){
        playerX -= 5
    }else if(rightPressed && playerX < canvas.width - playerSize){
        playerX += 5
    }

    requestAnimationFrame(draw)

    drawPlayer()
}

draw()






  
// Function to update the player data

