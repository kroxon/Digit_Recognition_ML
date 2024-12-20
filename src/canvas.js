let isDrawing = false;
let lastX = 0;
let lastY = 0;
const lineWidth = 30;
const lineColor = "white";

export function setupCanvas(onPredict) {
    const canvas = document.getElementById('drawingCanvas');
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'white';  // 

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

    // Pobierz dane obrazu z canvas
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    const gridSize = 20; // 20 wierszy i 20 kolumn
    const segmentWidth = canvas.width / gridSize;  // szerokość jednej komórki
    const segmentHeight = canvas.height / gridSize;  // wysokość jednej komórki

    // Próg jasności
    const threshold = 128;

    // Utwórz tablicę na przetworzone dane (20x20)
    let processedData = Array.from({ length: gridSize }, () => Array(gridSize).fill(0));

    // Iteracja przez każdy segment (20x20)
    for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
            const startX = Math.floor(col * segmentWidth);
            const startY = Math.floor(row * segmentHeight);
            const endX = Math.floor((col + 1) * segmentWidth);
            const endY = Math.floor((row + 1) * segmentHeight);

            let totalBrightness = 0;
            let pixelCount = 0;

            // Oblicz średnią jasność dla danego segmentu
            for (let y = startY; y < endY; y++) {
                for (let x = startX; x < endX; x++) {
                    const index = (y * canvas.width + x) * 4; // indeks w tablicy danych o pikselach
                    const r = data[index];
                    const g = data[index + 1];
                    const b = data[index + 2];

                    const brightness = (r + g + b) / 3;
                    totalBrightness += brightness;
                    pixelCount++;
                }
            }

            const averageBrightness = totalBrightness / pixelCount;
            const binaryValue = averageBrightness >= threshold ? 1 : 0;

            // Upewnij się, że row i col są przypisywane prawidłowo
            processedData[row][col] = binaryValue;
        }
    }

    let transposedData = Array.from({ length: gridSize }, (_, col) =>
        processedData.map(row => row[col])
    );

    // Spłaszcz dane do jednowymiarowej tablicy (400 elementów)
    const flattenedData = transposedData.flat();

    // Zwróć tensor jednowymiarowy o długości 400
    const tensor = tf.tensor2d(flattenedData, [1, 400]);
    return tensor;
}

