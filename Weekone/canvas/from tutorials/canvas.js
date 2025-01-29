var canvas = document.querySelector('canvas');

canvas.width = 500;
canvas.height = 500;


var c = canvas.getContext('2d');
// c.fillRect(x, y, width, height);
c.fillRect(100, 100, 60, 60);
c.fillRect(200, 100, 60, 60);
c.fillRect(100, 200, 60, 60);
c.fillRect(200, 200, 60, 60);

// Line
c.beginPath();
c.moveTo(100, 300)
c.lineTo(160, 300)
c.stroke();

