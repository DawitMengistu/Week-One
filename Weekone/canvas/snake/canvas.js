

var canvas = document.querySelector('canvas');
const sizeX = 400;
const sizeY = 400;
const gridGap = 20;

let state = "";
let snake = [[((sizeX / gridGap) / 2) * 20, ((sizeX / gridGap) / 2) * 20], [200, 220]]

let food;
makeFoodAtRandom();

canvas.width = sizeX;
canvas.height = sizeY;


var c = canvas.getContext('2d');
// c.fillRect(x, y, width, height);

// Line
function renderGrid() {
    for (let i = gridGap; i < sizeX; i += gridGap) {
        c.beginPath();
        c.strokeStyle = "gray";
        c.lineWidth = 1.3;
        c.moveTo(0, i)
        c.lineTo(sizeX, i)
        c.stroke();

        c.beginPath();
        // c.strokeStyle = "red";
        c.lineWidth = 1;
        c.moveTo(i, 0)
        c.lineTo(i, sizeY)
        c.stroke();
    }
}


renderSnake();

function renderSnake() {

    c.clearRect(0, 0, canvas.width, canvas.height);
    renderGrid();


    c.fillStyle = "#17f360";
    c.fillRect(food[0] * gridGap, food[1] * gridGap, gridGap, gridGap);

    for (let x = 0; x < snake.length; x++) {
        c.fillStyle = x % 2 ? "#F32F17" : "black";
        c.fillRect(snake[x][0], snake[x][1], gridGap, gridGap);
    }



}
let moveInterval = 170;
let animationId = null;
let lastTimeUp = 0, lastTimeRight = 0, lastTimeLeft = 0, lastTimeDown = 0;

function calMoveUp(snake, timestamp) {
    if (!lastTimeUp) lastTimeUp = timestamp;
    if (timestamp - lastTimeUp >= moveInterval) {
        if (snake[0][1] > 0) {
            let prSateX = snake[0][0];
            let prSateY = snake[0][1];


            if (snake[0][1] == food[1] * gridGap && snake[0][0] == food[0] * gridGap) onFood();
            snake[0][1] -= gridGap;

            for (let i = 1; i < snake.length; i++) {
                calOnSelf(i);

                const tempX = snake[i][0];
                const tempY = snake[i][1];


                snake[i][0] = prSateX;
                snake[i][1] = prSateY;

                prSateX = tempX;
                prSateY = tempY;

            }
            renderSnake();

            lastTimeUp = timestamp;
        } else {
            cancelAnimationFrame(animationId);
            alert("Game Over!")
            reset();
            return;
        }
    }
    animationId = requestAnimationFrame((time) => calMoveUp(snake, time));
}

function calMoveRight(snake, timestamp) {
    if (!lastTimeRight) lastTimeRight = timestamp;
    if (timestamp - lastTimeRight >= moveInterval) {
        if (snake[0][0] < sizeX - gridGap) {
            let prSateX = snake[0][0];
            let prSateY = snake[0][1];


            if (snake[0][1] == food[1] * gridGap && snake[0][0] == food[0] * gridGap) onFood();
            snake[0][0] += gridGap;

            for (let i = 1; i < snake.length; i++) {
                calOnSelf(i);

                const tempX = snake[i][0];
                const tempY = snake[i][1];


                snake[i][0] = prSateX;
                snake[i][1] = prSateY;

                prSateX = tempX;
                prSateY = tempY;
            }


            renderSnake();


            lastTimeRight = timestamp;
        } else {
            cancelAnimationFrame(animationId);
            alert("Game Over");
            reset();
            return;
        }
    }

    animationId = requestAnimationFrame((time) => calMoveRight(snake, time));
}

function calMoveLeft(snake, timestamp) {
    if (!lastTimeLeft) lastTimeLeft = timestamp;
    if (timestamp - lastTimeLeft >= moveInterval) {
        if (snake[0][0] > 0) {
            let prSateX = snake[0][0];
            let prSateY = snake[0][1];


            if (snake[0][1] == food[1] * gridGap && snake[0][0] == food[0] * gridGap) onFood();
            snake[0][0] -= gridGap;

            for (let i = 1; i < snake.length; i++) {
                calOnSelf(i);

                const tempX = snake[i][0];
                const tempY = snake[i][1];


                snake[i][0] = prSateX;
                snake[i][1] = prSateY;

                prSateX = tempX;
                prSateY = tempY;
            }



            renderSnake();
            lastTimeLeft = timestamp;
        } else {
            cancelAnimationFrame(animationId);
            alert("Game Over");
            reset();
            return;
        }
    }
    animationId = requestAnimationFrame((time) => calMoveLeft(snake, time));
}

function calMoveDown(snake, timestamp) {
    if (!lastTimeDown) lastTimeDown = timestamp;
    if (timestamp - lastTimeDown >= moveInterval) {
        if (snake[0][1] < sizeY - gridGap) {

            let prSateX = snake[0][0];
            let prSateY = snake[0][1];


            if (snake[0][1] == food[1] * gridGap && snake[0][0] == food[0] * gridGap) onFood();
            snake[0][1] += gridGap;
            let head = snake[0];

            for (let i = 1; i < snake.length; i++) {
                calOnSelf(i);

                const tempX = snake[i][0];
                const tempY = snake[i][1];


                snake[i][0] = prSateX;
                snake[i][1] = prSateY;

                prSateX = tempX;
                prSateY = tempY;
            }

            renderSnake();
            lastTimeDown = timestamp;
        } else {
            cancelAnimationFrame(animationId);
            alert("Game Over!")
            reset();
            return;
        }
    }
    animationId = requestAnimationFrame((time) => calMoveDown(snake, time));
}

// Movement functions
function moveUpWard() {
    if (animationId) cancelAnimationFrame(animationId);
    animationId = requestAnimationFrame((timestamp) => calMoveUp(snake, timestamp));
}

function moveRightSide() {
    if (animationId) cancelAnimationFrame(animationId);
    animationId = requestAnimationFrame((timestamp) => calMoveRight(snake, timestamp));
}

function moveLeftSide() {
    if (animationId) cancelAnimationFrame(animationId);
    animationId = requestAnimationFrame((timestamp) => calMoveLeft(snake, timestamp));
}

function moveDownWard() {
    if (animationId) cancelAnimationFrame(animationId);
    animationId = requestAnimationFrame((timestamp) => calMoveDown(snake, timestamp));
}


function addSize(state) {
    if (state == 'up') {
        snake.push([snake[snake.length - 1][0], snake[snake.length - 1][1] + (gridGap)]);
    } else if (state == "down") {
        snake.push([snake[snake.length - 1][0], snake[snake.length - 1][1] - (gridGap)]);
    } else if (state == "right") {
        snake.push([snake[snake.length - 1][0] + (gridGap), snake[snake.length - 1][1]]);
    } else if (state == "left") {
        snake.push([snake[snake.length - 1][0] - (gridGap), snake[snake.length - 1][1]]);
    }
}


function onFood() {

    addSize(state);
    makeFoodAtRandom();
    renderSnake();

    moveInterval -= Math.max(1, Math.floor(moveInterval * 0.05));


}


function makeFoodAtRandom() {
    let x = Math.floor(Math.random() * (sizeX / gridGap));
    let y = Math.floor(Math.random() * (sizeY / gridGap));

    while (snake.some(segment => segment[0] === x && segment[1] === y)) {
        x = Math.floor(Math.random() * (sizeX / gridGap));
        y = Math.floor(Math.random() * (sizeY / gridGap));
    }
    food = [x, y];
}

function calOnSelf(i) {
    let head = snake[0];
    if (head[0] === snake[i][0] && head[1] === snake[i][1]) {
        alert("Game Over: Snake hit itself!");
        reset();
        return true;
    }
    return false;
}


function reset() {
    moveInterval = 170;
    state = "";
    snake = [[((sizeX / gridGap) / 2) * 20, ((sizeX / gridGap) / 2) * 20], [200, 220]]
    makeFoodAtRandom();

    renderSnake();
}
let prInterval = moveInterval;
document.addEventListener("keydown", (event) => {
    moveInterval = prInterval;

    if (state !== "down" && event.key === "ArrowUp") {
        moveUpWard();
        state = "up"
    } else if (state !== "left" && event.key === "ArrowRight") {
        moveRightSide();
        state = "right"
    } else if (state !== "up" && event.key === "ArrowDown") {
        moveDownWard();
        state = "down"
    } else if (state !== "right" && event.key === "ArrowLeft") {
        moveLeftSide();
        state = "left"
    }

});



for (let i = 0; i < 15; i++) {
    addSize("up")
    renderSnake();
}

