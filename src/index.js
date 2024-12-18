import './styles.css';
import { loadData, createModel, trainModel, predictDigit } from './model';
// import dataX from './data/X.json';
// import dataY from './data/y.json';


let isDrawing = false;
let lastX = 0;
let lastY = 0;
const lineWidth = 30;
const lineColor = "black";

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

// async function loadData() {
//     const XResponse = await fetch('data/X.json');
//     const yResponse = await fetch('data/y.json');

//     let X = await XResponse.json();
//     let y = await yResponse.json();

//     X = X.map(row => row.map(value => value > 0.5 ? 1 : 0));

//     if (Array.isArray(y) && Array.isArray(y[0])) {
//         y = y.map(row => row[0]);
//     }

//     X = tf.tensor2d(X);
//     y = tf.tensor1d(y);

//     return { X, y };
// }

// function createModel() {
//     const model = tf.sequential();
//     model.add(tf.layers.dense({ units: 128, activation: 'relu', inputShape: [400] }));
//     model.add(tf.layers.dropout({ rate: 0.5 }));
//     model.add(tf.layers.dense({ units: 64, activation: 'relu' }));
//     model.add(tf.layers.dense({ units: 10, activation: 'softmax' }));

//     return model;
// }

async function main() {
    try {
        const { X, y } = await loadData();

        const model = createModel();

        const history = await trainModel(model, X, y);
        console.log('Finished training:', history);

        await predictDigit(X, model, 2015); // Predict a example digit
    } catch (err) {
        console.error('Error during training:', err);
    }
}

main();

