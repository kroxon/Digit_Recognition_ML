import { displayDigit, displayPredictions } from './display';

export async function loadData() {
    const XResponse = await fetch('./data/X.json');
    const yResponse = await fetch('./data/y.json');

    let X = await XResponse.json();
    let y = await yResponse.json();

    X = X.map(row => row.map(value => value > 0.5 ? 1 : 0));

    if (Array.isArray(y) && Array.isArray(y[0])) {
        y = y.map(row => row[0]);
    }

    X = tf.tensor2d(X);
    y = tf.tensor1d(y);

    return { X, y };
}

export function createModel() {
    const model = tf.sequential();
    model.add(tf.layers.dense({ units: 128, activation: 'relu', inputShape: [400] }));
    model.add(tf.layers.dropout({ rate: 0.5 }));
    model.add(tf.layers.dense({ units: 64, activation: 'relu' }));
    model.add(tf.layers.dense({ units: 10, activation: 'softmax' }));

    return model;
}

export async function trainModel(model, X, y) {
    model.compile({
        loss: 'sparseCategoricalCrossentropy',
        optimizer: tf.train.adam(0.0005),
        metrics: ['accuracy']
    });

    const history = await model.fit(X, y, {
        epochs: 40,
        batchSize: 32,
        shuffle: true,
        callbacks: {
            onEpochEnd: (epoch, logs) => {
                console.log(`Epoka ${epoch + 1}: loss = ${logs.loss.toFixed(4)}, accuracy = ${logs.acc.toFixed(4)}`);
            }
        }
    });

    return history;
}

export async function trainModelWithUI(model, X, y, { epochs = 40, batchSize = 32 } = {}) {
    const panel = document.getElementById('trainingPanel');
    const ep = document.getElementById('tpEpoch');
    const prog = document.getElementById('tpProgress');
    const metricsBox = document.getElementById('tpMetrics');
    const log = document.getElementById('tpLog');
    const timeEl = document.getElementById('tpTime');
    panel?.classList.remove('is-hidden');
    ep.textContent = `0/${epochs}`;
    prog.value = 0; prog.max = 100;
    metricsBox.innerHTML = '';
    log.textContent = '';
    const start = performance.now();

    model.compile({
        loss: 'sparseCategoricalCrossentropy',
        optimizer: tf.train.adam(0.0005),
        metrics: ['accuracy']
    });

    const history = await model.fit(X, y, {
        epochs, batchSize, shuffle: true,
        callbacks: {
            onEpochEnd: (epoch, logs) => {
                const acc = (logs.acc ?? logs.accuracy ?? 0).toFixed(4);
                ep.textContent = `${epoch + 1}/${epochs}`;
                prog.value = ((epoch + 1) / epochs) * 100;
                const elapsed = ((performance.now() - start) / 1000).toFixed(1);
                timeEl.textContent = `${elapsed}s`;
                metricsBox.innerHTML = `<span>loss: ${logs.loss.toFixed(4)}</span><span>acc: ${acc}</span>`;
                log.textContent += `Epoch ${epoch + 1}: loss=${logs.loss.toFixed(4)} acc=${acc}\n`;
                log.scrollTop = log.scrollHeight;
            },
            onTrainEnd: () => {
                const total = ((performance.now() - start) / 1000).toFixed(1);
                metricsBox.innerHTML += `<span>done</span>`;
                timeEl.textContent = `${total}s total`;
            }
        }
    });

    return history;
}

export async function predictDigitFromXData(dataX, model, index = 4015) {
    const imageOfDigit = dataX.slice([index, 0], [1, 400]);

    displayDigit(imageOfDigit);

    const prediction = model.predict(imageOfDigit);
    const predictionArray = await prediction.array();
    const largestPredictionIndex = prediction.argMax(-1).dataSync()[0];

    return largestPredictionIndex;
}

export async function predictDigit(imageData, model) {
    if (!(imageData instanceof tf.Tensor)) {
        throw new Error('imageData must be a Tensor');
    }

    const prediction = model.predict(imageData);
    const predictionArray = await prediction.array();
    const largestPredictionIndex = prediction.argMax(-1).dataSync()[0];
    displayPredictions(predictionArray, largestPredictionIndex);
    displayDigit(imageData);
    return largestPredictionIndex;
}

// save model
export async function saveModel(model) {
    await model.save('downloads://model');
}

export async function loadModel(modelUrl) {
    const model = await tf.loadLayersModel(modelUrl);
    console.log('Model loaded successfully');
    return model;
}