import './styles.css';
import { loadData, loadModel, predictDigit, createModel, trainModelWithUI } from './tensorflowModel';
import { setupCanvas, getCanvasImageData, clearCanvas } from './canvas';
import { destroyChart } from './display';

async function main() {
    let inferenceModel; // model used for predictions (pre-trained)
    try {
        inferenceModel = await loadModel('./models/model.json');

        setupCanvas(async () => {
            const resultPreview = document.getElementById('resultPreview');
            const predictionList = document.getElementById('predictionList');
            // Reveal result panels BEFORE drawing the chart so Chart.js can size correctly
            resultPreview?.classList.remove('is-hidden');
            predictionList?.classList.remove('is-hidden');
            // Wait one animation frame to ensure layout is applied
            await new Promise(requestAnimationFrame);
            const imageData = getCanvasImageData();
            await predictDigit(imageData, inferenceModel);
        });

        const clearButton = document.getElementById('clearButton');
        clearButton.addEventListener('click', () => {
            clearCanvas();
            const resultPreview = document.getElementById('resultPreview');
            const digitResult = document.getElementById('digitResult');
            const predictionLabel = document.getElementById('predictionLabel');
            const predictionList = document.getElementById('predictionList');
            if (digitResult) digitResult.innerHTML = '';
            if (predictionLabel) predictionLabel.innerHTML = '';
            resultPreview?.classList.add('is-hidden');
            predictionList?.classList.add('is-hidden');
            destroyChart();
        });

        // Training button logic (does not replace inferenceModel)
        const trainButton = document.getElementById('trainButton');
        trainButton?.addEventListener('click', async () => {
            trainButton.disabled = true;
            trainButton.textContent = 'Training...';
            try {
                const { X, y } = await loadData();
                const newModel = createModel();
                await trainModelWithUI(newModel, X, y, { epochs: 40, batchSize: 32 });
            } catch (e) {
                console.error('Training failed', e);
            } finally {
                trainButton.textContent = 'Train New Model';
                trainButton.disabled = false;
            }
        });

    } catch (err) {
        console.error('Error during init:', err);
    }
}

main();

