import { displayDigit } from './display';
// import dataX from './data/X.json';
// import dataY from './data/y.json';

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
        // epochs: 40,
        epochs: 10,
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

export async function predictDigit(dataX, model, index = 4015) {
    const imageOfDigit = dataX.slice([index, 0], [1, 400]); // Pobranie obrazu cyfry

    displayDigit(imageOfDigit); // Wyświetlenie obrazu

    const prediction = model.predict(imageOfDigit); // Przewidywanie
    const predictionArray = await prediction.array(); // Konwersja na tablicę
    const largestPredictionIndex = prediction.argMax(-1).dataSync()[0]; // Znalezienie największej wartości

    console.log("Predicting a Two:");
    console.log(predictionArray);
    console.log(`Largest Prediction Index: ${largestPredictionIndex}`);

    return largestPredictionIndex;
}