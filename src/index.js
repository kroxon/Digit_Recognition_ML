let isDrawing = false;
let lastX = 0;
let lastY = 0;
const lineWidth = 30;
const lineColor = "black";

// Pobieramy element canvas i kontekst
const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');

// Obsługuje rysowanie na canvasie
canvas.addEventListener("mousedown", (e) => {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
    canvas.style.cursor = 'crosshair'; // zmiana kursora na crosshair
});

canvas.addEventListener("mousemove", (e) => {
    if (!isDrawing) return;
    const x = e.offsetX;
    const y = e.offsetY;

    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(x, y);
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = lineColor;
    ctx.stroke();

    [lastX, lastY] = [x, y];
});

canvas.addEventListener("mouseup", () => {
    isDrawing = false;
    canvas.style.cursor = 'default'; // przywrócenie normalnego kursora
});

canvas.addEventListener("mouseout", () => {
    isDrawing = false;
    canvas.style.cursor = 'default'; // przywrócenie normalnego kursora
});

