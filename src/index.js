import './styles.css';
import { loadData, loadModel, predictDigit, predictDigitFromXData, createModel, trainModel, saveModel } from './tensorflowModel';
import { setupCanvas, getCanvasImageData, clearCanvas } from './canvas';
import { destroyChart } from './display';

async function main() {
    let model;
    try {
        // const { X, y } = await loadData();

        // model = createModel();

        // const history = await trainModel(model, X, y);
        // console.log('Finished training:', history);
        // const save = await saveModel(model);

        // Load the pre-trained model
        model = await loadModel('/models/model.json');

        // await predictDigitFromXData(X, model, 3445); // Predict a example digit  

        // Setup canvas and add a button to predict the drawn digit
        setupCanvas(async () => {
            const resultPreview = document.getElementById('resultPreview');
            const predictionList = document.getElementById('predictionList');
            // Reveal result panels BEFORE drawing the chart so Chart.js can size correctly
            resultPreview?.classList.remove('is-hidden');
            predictionList?.classList.remove('is-hidden');
            // Wait one animation frame to ensure layout is applied
            await new Promise(requestAnimationFrame);

            const imageData = getCanvasImageData();
            await predictDigit(imageData, model);
        });

        // Setup clear button
        const clearButton = document.getElementById('clearButton');
        clearButton.addEventListener('click', () => {
            clearCanvas();
            const resultPreview = document.getElementById('resultPreview');
            const digitResult = document.getElementById('digitResult');
            const predictionLabel = document.getElementById('predictionLabel');
            const predictionList = document.getElementById('predictionList');

            if (digitResult) {
                digitResult.innerHTML = '';
            }
            if (predictionLabel) {
                predictionLabel.innerHTML = '';
            }
            resultPreview?.classList.add('is-hidden');
            predictionList?.classList.add('is-hidden');

            destroyChart();
        });

    } catch (err) {
        console.error('Error during training or prediction:', err);
    }
}

main();

