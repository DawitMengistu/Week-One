

var canvas = document.querySelector('canvas');
const sizeX = 400;
const sizeY = 400;
const gridGap = 20;

let speed = 10;
let state = "";
let snake = [[((sizeX / gridGap) / 2) * 20, ((sizeX / gridGap) / 2) * 20], [200, 220]]
let food = [5, 5]

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

    for (let x = 0; x < snake.length; x++) {
        c.fillStyle = x % 2 ? "gray" : "green";
        c.fillRect(snake[x][0], snake[x][1], gridGap, gridGap);
    }

    c.fillStyle = "red";
    c.fillRect(food[0] * gridGap, food[1] * gridGap, gridGap, gridGap);

}
let moveInterval = 50;
let animationId = null;
let lastTimeUp = 0, lastTimeRight = 0, lastTimeLeft = 0, lastTimeDown = 0;

function calMoveUp(snake, timestamp) {
    if (!lastTimeUp) lastTimeUp = timestamp;
    if (timestamp - lastTimeUp >= moveInterval) {
        if (snake[0][1] > 0) {
            let prSateX = snake[0][0];
            let prSateY = snake[0][1];
            snake[0][1] -= gridGap;

            for (let i = 1; i < snake.length; i++) {
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
            snake[0][0] += gridGap;

            for (let i = 1; i < snake.length; i++) {
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
            snake[0][0] -= gridGap;

            for (let i = 1; i < snake.length; i++) {
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
            snake[0][1] += gridGap;

            for (let i = 1; i < snake.length; i++) {
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

console.log(snake, "<--")

function addSizeRandom(state) {
    // if (state == 'up') {
    console.log(snake[snake.length - 1], "<-- last index");
    snake.push([200, 240]);

    // }
}

addSizeRandom();
renderSnake();




document.addEventListener("keydown", (event) => {
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


