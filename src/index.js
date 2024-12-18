import './styles.css';
import { loadData, loadModel, predictDigit } from './model';
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


async function main() {
    let model;
    try {
        const { X, y } = await loadData();

        // model = createModel();

        // const history = await trainModel(model, X, y);
        // console.log('Finished training:', history);

        // Load the pre-trained model
        model = await loadModel('/models/model.json');

        await predictDigit(X, model,4615); // Predict a example digit
    } catch (err) {
        console.error('Error during training:', err);
    }



}

main();

