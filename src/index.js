import './styles.css';
import { loadData, loadModel, predictDigit, createModel, trainModelWithUI } from './tensorflowModel';
import { setupCanvas, getCanvasImageData, clearCanvas } from './canvas';
import { destroyChart } from './display';

async function main() {
    let inferenceModel; // pre-trained prediction model
    let slideshowInterval;
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

        const trainButton = document.getElementById('trainButton');
        const sampleWrap = document.getElementById('trainSampleWrap');
        const sampleCanvas = document.getElementById('trainSampleCanvas');
        const sampleCtx = sampleCanvas?.getContext('2d');
        const sampleDigitEl = document.getElementById('trainSampleDigit');

        function drawSample(row) {
            if (!sampleCtx) return;
            const size = 20;
            const scale = 5; // 100x100 final
            const imgData = new ImageData(size, size);
            // Rotation 90° CW + horizontal flip simplifies to transpose mapping
            // displayed (x,y) takes value from original at index (y + x*20)
            for (let y = 0; y < size; y++) {
                for (let x = 0; x < size; x++) {
                    const origIdxFlat = y + x * size; // transposed access
                    const v = row[origIdxFlat]; // 0..1
                    const g = Math.pow(v, 0.85); // slightly lighter thin strokes
                    const alpha = Math.round(g * 255);
                    const di = (y * size + x) * 4;
                    imgData.data[di] = 255;
                    imgData.data[di + 1] = 255;
                    imgData.data[di + 2] = 255;
                    imgData.data[di + 3] = alpha;
                }
            }
            const off = document.createElement('canvas');
            off.width = size; off.height = size;
            const offCtx = off.getContext('2d');
            offCtx.putImageData(imgData, 0, 0);
            sampleCtx.imageSmoothingEnabled = false;
            sampleCtx.clearRect(0, 0, scale * size, scale * size);
            const pad = 2;
            sampleCtx.drawImage(off, 0, 0, size, size, pad, pad, size * scale - pad * 2, size * scale - pad * 2);
        }

        trainButton?.addEventListener('click', async () => {
            if (slideshowInterval) clearInterval(slideshowInterval);
            trainButton.disabled = true;
            trainButton.textContent = 'Training...';
            try {
                const { X, y, rawX } = await loadData();
                const labelsArray = await y.data();
                const newModel = createModel();
                sampleWrap?.classList.remove('is-hidden');
                // rapid slideshow of samples (every 100ms)
                slideshowInterval = setInterval(() => {
                    const idx = Math.floor(Math.random() * rawX.length);
                    const r = rawX[idx];
                    drawSample(r);
                    if (sampleDigitEl) sampleDigitEl.textContent = labelsArray[idx];
                }, 100);
                await trainModelWithUI(newModel, X, y, { epochs: 40, batchSize: 32 });
            } catch (e) {
                console.error('Training failed', e);
            } finally {
                clearInterval(slideshowInterval);
                trainButton.textContent = 'Train New Model';
                trainButton.disabled = false;
            }
        });

    } catch (err) {
        console.error('Error during init:', err);
    }
}

main();

