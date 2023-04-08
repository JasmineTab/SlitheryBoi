//display
var blockSize = 25;
var rows = 20;
var cols = 20;
var display;
var context;

//snake stuff
var snakeX = blockSize * 5;
var snakeY = blockSize * 5;

var vX = 0;
var vY = 0;

var snakeBody = [];

//food stuff
var foodX;
var foodY;

//game functions
var score = 0;
var gameEnd = false;

window.onload = function displayScreen() {
    display = document.getElementById("display");
    display.height = rows * blockSize;
    display.width = cols * blockSize;
    context = display.getContext("2d");

    document.getElementById("score").innerHTML = score;

    foodRando();
    document.addEventListener("keyup", changeDirection);

    setInterval(update, 1000 / 10);
}

function update() {
    if (gameEnd) {
        history.go();
        return;
    }

    //background display
    context.fillStyle = "black";
    context.fillRect(0, 0, display.width, display.height);

    //food display
    context.fillStyle = "#54169c";
    context.fillRect(foodX, foodY, blockSize, blockSize);

    if (snakeX == foodX && snakeY == foodY) {
        snakeBody.push([foodX, foodY]);
        score += 1;
        document.getElementById("score").innerHTML = score;

        foodRando();
    }

    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }
    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }

    //snake display
    context.fillStyle = "#227839";
    snakeX += vX * blockSize;
    snakeY += vY * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }

    //game end conditions
    if (snakeX < 0 || snakeX > cols * blockSize || snakeY < 0 || snakeY > rows * blockSize) {
        gameEnd = true;
        alert("U Lost L Skill Diff Frfr");
    }

    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            gameEnd = true;
            alert("U Lost L Skill Diff Frfr");
        }
    }
}

function foodRando() {
    //get random place to put the food
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;

    for (let i = snakeBody.length - 1; i > 0; i--) {
        if(foodX == snakeBody[i][0] && foodY == snakeBody[i][1]){
            foodRando();
        }
    }
}

function changeDirection(event) {
    if (event.code == "ArrowUp" && vY != 1) {
        vX = 0;
        vY = -1;
    } else if (event.code == "ArrowDown" && vY != -1) {
        vX = 0;
        vY = 1;
    } else if (event.code == "ArrowLeft" && vX != 1) {
        vX = -1;
        vY = 0;
    } else if (event.code == "ArrowRight" && vX != -1) {
        vX = 1;
        vY = 0;
    }
}