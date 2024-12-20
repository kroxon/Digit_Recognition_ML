import * as tf from '@tensorflow/tfjs';
import { displayDigit } from './display';
import dataX from './data/X.json';
import dataY from './data/y.json';

export async function loadData() {
    const XResponse = await fetch('data/X.json');
    const yResponse = await fetch('data/y.json');

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

export async function loadModel(modelUrl) {
    const model = await tf.loadLayersModel(modelUrl);
    console.log('Model loaded successfully');
    return model;
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
    console.log(`Largest Prediction Index: ${largestPredictionIndex}`);
    displayDigit(imageData);
    return largestPredictionIndex;
}