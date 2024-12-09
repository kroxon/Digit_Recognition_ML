import * as tf from '@tensorflow/tfjs';

let model;

export async function loadModel() {
    try {
        model = await tf.loadLayersModel('./models/model.json');
        console.log('Model załadowany pomyślnie!');
    } catch (error) {
        console.error('Błąd podczas ładowania modelu:', error);
    }
}

// prediction MNIST data (20x20)
export async function predictDigit(data) {
    if (!model) {
        console.error('Model nie został załadowany!');
        return;
    }

    try {
        const tensor = tf.tensor4d(data, [1, 20, 20, 1]);

        const predictions = model.predict(tensor);

        const predictedIndex = predictions.argMax(-1).dataSync()[0];

        console.log(`Predykcja: ${predictedIndex}`);
        return predictedIndex;
    } catch (error) {
        console.error('Błąd podczas predykcji:', error);
    }
}
