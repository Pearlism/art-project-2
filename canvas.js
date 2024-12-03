const canvas = document.getElementById("drawingCanvas");
const ctx = canvas.getContext("2d");

// Set canvas dimensions
canvas.width = window.innerWidth * 0.8;
canvas.height = window.innerHeight * 0.6;

// Brush settings
let painting = false;
let brushSize = 5;
let brushColor = "#FF00FF";

// Start and stop painting
function startPosition(e) {
    painting = true;
    draw(e);
}

function endPosition() {
    painting = false;
    ctx.beginPath();
}

function draw(e) {
    if (!painting) return;

    ctx.lineWidth = brushSize;
    ctx.lineCap = "round";
    ctx.strokeStyle = brushColor;

    ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
}

// Event listeners for drawing
canvas.addEventListener("mousedown", startPosition);
canvas.addEventListener("mouseup", endPosition);
canvas.addEventListener("mousemove", draw);

// Adjust brush size
const decreaseBrush = document.getElementById("decreaseBrush");
const increaseBrush = document.getElementById("increaseBrush");

decreaseBrush.addEventListener("click", () => {
    if (brushSize > 1) brushSize--;
});

increaseBrush.addEventListener("click", () => {
    if (brushSize < 50) brushSize++;
});

// Change brush color
const colorPicker = document.getElementById("colorPicker");
colorPicker.addEventListener("input", (e) => {
    brushColor = e.target.value;
});
