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




async function loadData() {
    // Załaduj dane z plików JSON
    const XResponse = await fetch('data/X.json');
    const yResponse = await fetch('data/y.json');

    // Przekształć odpowiedzi na obiekty JSON
    let X = await XResponse.json();
    const y = await yResponse.json();

    X = X.map(row => row.map(value => value > 0.5 ? 1 : 0));

    // Zwróć dane
    return { X, y };
}

// Przykład użycia:
loadData().then(({ X, y }) => {
    // console.log('X:', X[7]);
    // console.log('y:', y);
    // console.log('X:', X[0]);
    console.log('The first element of y is:', y[0][0]);
    console.log('The last element of y is:', y[y.length - 1][0]);

    console.log('The shape of X is: [' + X.length + ', ' + (X[0] ? X[0].length : 0) + ']');
    console.log('The shape of y is: [' + y.length + ', ' + (y[0] ? y[0].length : 0) + ']');
});