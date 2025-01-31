var canvas = document.querySelector('canvas');
const sizeX = 600;
const sizeY = 600;

canvas.width = sizeX;
canvas.height = sizeY;

var c = canvas.getContext('2d');
let currentColor = 'black';
let pointSize = 4;


function drawPoint(x, y) {
    c.fillStyle = currentColor;
    c.beginPath();
    c.arc(x, y, pointSize, 0, Math.PI * 2);
    c.fill();
}


canvas.addEventListener("mousemove", (event) => {
    if (event.buttons === 1) {
        drawPoint(event.offsetX, event.offsetY);
    }
});


function clearCanvas() {
    c.clearRect(0, 0, canvas.width, canvas.height);
}




function setColor(color) {
    currentColor = color;
}


function setSize(size) {
    pointSize = size;
}
