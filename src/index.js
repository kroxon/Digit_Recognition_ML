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
    canvas.style.cursor = 'default';
});

async function loadData() {
    const XResponse = await fetch('data/X.json');
    const yResponse = await fetch('data/y.json');

    let X = await XResponse.json();
    let y = await yResponse.json();

    X = X.map(row => row.map(value => value > 0.5 ? 1 : 0));

    if (Array.isArray(y) && Array.isArray(y[0])) {
        y = y.map(row => row[0]); // Przyjmujemy, że interesuje nas pierwsza wartość w każdej podtablicy
    }

    X = tf.tensor2d(X); // Konwersja X na tensor 2D
    y = tf.tensor1d(y); // Konwersja y na tensor 1D

    return { X, y };
}

function createModel() {
    const model = tf.sequential();
    model.add(tf.layers.dense({ units: 25, activation: 'relu', inputShape: [400], name: 'L1' }));
    model.add(tf.layers.dense({ units: 15, activation: 'relu', name: 'L2' }));
    model.add(tf.layers.dense({ units: 10, activation: 'linear', name: 'L3' }));

    return model;
}

async function trainModel(model, X, y) {
    model.compile({
        loss: 'sparseCategoricalCrossentropy',
        optimizer: tf.train.adam(0.001),
        metrics: ['accuracy']
    });

    const history = await model.fit(X, y, {
        epochs: 40,
        batchSize: 32, // Możesz dostosować rozmiar partii
        shuffle: true, // Losowe tasowanie danych
        callbacks: {
            onEpochEnd: (epoch, logs) => {
                console.log(`Epoka ${epoch + 1}: loss = ${logs.loss.toFixed(4)}, accuracy = ${logs.acc.toFixed(4)}`);
            }
        }
    });

    return history;
}

async function main() {
    try {
        const { X, y } = await loadData();

        const model = createModel();

        const history = await trainModel(model, X, y);
        console.log('Trening zakończony!', history);
    } catch (err) {
        console.error('Błąd podczas ładowania danych lub trenowania modelu:', err);
    }
}

main();
