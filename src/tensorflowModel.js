// Import TensorFlow.js
import * as tf from '@tensorflow/tfjs';

// Load the model
async function loadModel() {
    const modelPath = './models/model.json';
    const model = await tf.loadLayersModel(modelPath);
    console.log(model.summary());
    console.log('Model loaded successfully!');
    return model;
}

// Predict function
async function predictDigit(data) {
    // Ensure the input data shape matches the model's expected input shape
    // The model expects a 400-element flattened array (20x20 image) as input
    const inputShape = [1, 400]; // 1 sample, 400 features
    const inputTensor = tf.tensor(data, inputShape);

    const model = await loadModel();

    // Perform the prediction
    const prediction = model.predict(inputTensor);

    // Convert the logits to probabilities
    const probabilities = prediction.softmax();
    const predictedClass = probabilities.argMax(1).dataSync()[0];

    console.log('Prediction:', predictedClass);
    return predictedClass;
}

export { loadModel, predictDigit };
