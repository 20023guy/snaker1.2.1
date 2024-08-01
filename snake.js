var blockSize = 25;
var rows = 21;
var cols = 40.5;
var board;
var context;

// Snake head
var snakeX = blockSize * 5;
var snakeY = blockSize * 5;

var velocityX = 0;
var velocityY = 0;

var snakeBody = [];

// Food
var foodX; 
var foodY;

// Kill blocks
var killBlocks = [];

var gameOver = false;

// Score
var score = 0;

window.onload = function() {
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d"); // Used for drawing on the board
    
    placeFood();
    placeKillBlocks();
    document.addEventListener("keyup", changeDirection);
    setInterval(update, 1000 / 10);

    // Initialize score display
    updateScore();

    
}

function update() {
    if (gameOver) {
        return;
    }         

    context.fillStyle = "black";
    context.fillRect(0, 0, board.width, board.height);

    context.fillStyle = "red";
    context.fillRect(foodX, foodY, blockSize, blockSize);

    context.fillStyle = "orange";
    killBlocks.forEach(function(kill) {
        context.fillRect(kill[0], kill[1], blockSize, blockSize);
    });

    if (snakeX == foodX && snakeY == foodY) {
        score++;
        snakeBody.push([foodX, foodY]);
        placeFood();
        placeKillBlocks();
        updateScore();
    }

    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }
    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }

    context.fillStyle = "lime";
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }

    if (snakeX < 0 || snakeX >= cols * blockSize || snakeY < 0 || snakeY >= rows * blockSize) {
        gameOver = true;
        alert("Player touched the void and died. Press Ctrl+R to Retry");
    }

    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            gameOver = true;
            alert("Player died due to him biting himself. Press Ctrl+R to Retry");
        }
    }

    killBlocks.forEach(function(kill) {
        if (snakeX == kill[0] && snakeY == kill[1]) {
            gameOver = true;
            alert("Player went into a pit of Lava. Press Ctrl+R to Retry");
        }
    });

    context.fillStyle = "red";
    context.fillRect(foodX, foodY, blockSize, blockSize);
}

function changeDirection(e) {
    if (e.code === "ArrowUp" && velocityY !== 1) {
        velocityX = 0;
        velocityY = -1;
    } else if (e.code === "ArrowDown" && velocityY !== -1) {
        velocityX = 0;
        velocityY = 1;
    } else if (e.code === "ArrowLeft" && velocityX !== 1) {
        velocityX = -1;
        velocityY = 0;
    } else if (e.code === "ArrowRight" && velocityX !== -1) {
        velocityX = 1;
        velocityY = 0;
    }
}

function placeFood() {
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
}

function placeKillBlocks() {
    var numKillBlocks = 6; // Number of kill blocks to generate each time
    killBlocks = [];
    for (var i = 0; i < numKillBlocks; i++) {
        var killX = Math.floor(Math.random() * cols) * blockSize;
        var killY = Math.floor(Math.random() * rows) * blockSize;
        killBlocks.push([killX, killY]);
    }
}



