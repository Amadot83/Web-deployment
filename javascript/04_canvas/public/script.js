var canvas;
var ctx;
var running = 0;
var interval;

window.onload = function() 
{
    canvas = document.getElementById("myCanvas");
    ctx = canvas.getContext("2d");
}
function startCanvas() 
{
    let startButton = document.getElementById("startButton");
    if (running) 
    { 
        running = 0;
        startButton.value = "Start";
        clearInterval(interval);
    }
    else 
    {
        running = 1;
        startButton.value = "Stop";
        interval = setInterval(createRect,200);
    }
}
function createRect() 
{
    let x,y = 0;
    let side = 0;
    let color = "#";
    const colorpicker = "ABCDEF0123456789";
    x = Math.floor(Math.random()*400);
    y = Math.floor(Math.random()*400);
    side = Math.floor(Math.random()*80)+20;
    for(let i=0;i<6;i++) {
        let temp = Math.floor(Math.random()*16);
        color = color + colorpicker[temp];
    }
    ctx.fillStyle = color;
    ctx.fillRect(x,y,side,side);
}
function clearCanvas()
{
    ctx.clearRect(0,0,500,500);
}
// get mouse pos, relative to canvas
function getMousePos(evt) 
{
    let rect = canvas.getBoundingClientRect();
    let tempX = Math.floor(evt.clientX - rect.left);
    let tempY = Math.floor(evt.clientY - rect.top);
    return {
        x: tempX,
        y: tempY
    }
}
//write mouse message
function writeMessage(message) 
{
    clearCanvas();
    ctx.font = "18px Times New Roman";
    ctx.fillStyle = "black";
    ctx.fillText(message, 10, 25);
}
// get key press, relative to canvas
function canvasMouseMove(evt) 
{
    let mousePos = getMousePos(evt);
    let message = "Mouse position: " + mousePos.x + ", " + mousePos.y;
    writeMessage(message);
}