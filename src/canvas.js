let isDrawing = false;
let lastX = 0;
let lastY = 0;
const lineWidth = 30;
const lineColor = "black";

export function setupCanvas(onPredict) {
    const canvas = document.getElementById('drawingCanvas');
    const ctx = canvas.getContext('2d');

    canvas.addEventListener("mousedown", (e) => {
        isDrawing = true;
        [lastX, lastY] = [e.offsetX, e.offsetY];
        canvas.style.cursor = 'crosshair'; // change cursor to crosshair
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
        canvas.style.cursor = 'default';
    });

    canvas.addEventListener("mouseout", () => {
        isDrawing = false;
        canvas.style.cursor = 'default';
    });

    const predictButton = document.getElementById('predictButton');
    predictButton.addEventListener('click', onPredict);
}

export function getCanvasImageData() {
    const canvas = document.getElementById('drawingCanvas');
    const ctx = canvas.getContext('2d');
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    const grayscaleData = [];
    for (let i = 0; i < data.length; i += 4) {
        const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
        grayscaleData.push(avg / 255);
    }

    const resizedData = tf.image.resizeBilinear(tf.tensor4d(grayscaleData, [1, canvas.height, canvas.width, 1]), [20, 20]);
    return resizedData.reshape([1, 400]);
}