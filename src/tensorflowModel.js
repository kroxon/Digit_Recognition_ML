import { displayDigit, displayPredictions } from './display';
import dataX from './data/X.json';
import dataY from './data/y.json';

export async function loadData() {
    const XResponse = await fetch('/data/X.json');
    const yResponse = await fetch('/data/y.json');

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

export async function predictDigitFromXData(dataX, model, index = 4015) {
    const imageOfDigit = dataX.slice([index, 0], [1, 400]);

    console.log("Image of digit:");
    console.log(imageOfDigit.arraySync());

    displayDigit(imageOfDigit);

    const prediction = model.predict(imageOfDigit);
    const predictionArray = await prediction.array();
    const largestPredictionIndex = prediction.argMax(-1).dataSync()[0];

    console.log("Predicting: ");
    console.log(predictionArray);
    console.log(`Predicted: ${largestPredictionIndex} with ${(predictionArray[0][largestPredictionIndex] * 100).toFixed(2)}% `);

    return largestPredictionIndex;
}

export async function predictDigit(imageData, model) {
    if (!(imageData instanceof tf.Tensor)) {
        throw new Error('imageData must be a Tensor');
    }

    const prediction = model.predict(imageData);
    const predictionArray = await prediction.array();
    const largestPredictionIndex = prediction.argMax(-1).dataSync()[0];
    console.log("Predicting a digit:");
    console.log(predictionArray);
    displayPredictions(predictionArray, largestPredictionIndex);
    console.log(`Largest Prediction Index: ${largestPredictionIndex}`);
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