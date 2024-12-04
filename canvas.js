const canvas = document.getElementById("drawingCanvas");
const ctx = canvas.getContext("2d");

// Set canvas dimensions
canvas.width = window.innerWidth * 0.8;
canvas.height = window.innerHeight * 0.6;

// Brush settings
let painting = false;
let erasing = false;
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

// Erasing logic
function erase(e) {
    if (!erasing) return;

    ctx.clearRect(e.clientX - canvas.offsetLeft - brushSize / 2, e.clientY - canvas.offsetTop - brushSize / 2, brushSize, brushSize);
}

// Event listeners for drawing and erasing
canvas.addEventListener("mousedown", startPosition);
canvas.addEventListener("mouseup", endPosition);
canvas.addEventListener("mousemove", (e) => {
    if (erasing) {
        erase(e);
    } else {
        draw(e);
    }
});

// Adjust brush size with slider
const brushSizeSlider = document.getElementById("brushSize");
const brushSizeDisplay = document.getElementById("brushSizeDisplay");

brushSizeSlider.addEventListener("input", (e) => {
    brushSize = e.target.value;
    brushSizeDisplay.textContent = brushSize;
});

// Change brush color
const colorPicker = document.getElementById("colorPicker");
colorPicker.addEventListener("input", (e) => {
    brushColor = e.target.value;
});

// Erase all button
const eraseAllButton = document.getElementById("eraseAll");
eraseAllButton.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// Toggle between eraser and brush
const toggleEraserButton = document.getElementById("toggleEraser");
toggleEraserButton.addEventListener("click", () => {
    erasing = !erasing;
    if (erasing) {
        toggleEraserButton.textContent = "Switch to Brush";
    } else {
        toggleEraserButton.textContent = "Switch to Eraser";
    }
});

// Back to brush
const backToBrushButton = document.getElementById("backToBrush");
backToBrushButton.addEventListener("click", () => {
    erasing = false;
    toggleEraserButton.textContent = "Switch to Eraser";
});
