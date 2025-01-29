
let rectX = 100;
let moveRight; 

function moveRect() {
    c.clearRect(0, 0, canvas.width, canvas.height);
    c.fillRect(rectX, 100, 60, 60);
    rectX += 1;

    moveRight = requestAnimationFrame(moveRect); // Store ID
}

// Start Animation
moveRect();

// Stop Animation Example (after 3 seconds)
setTimeout(() => {
    cancelAnimationFrame(moveRight);
}, 3000);
