const tf = window.tf;

let model = null;

// Funkcja ładowania modelu
async function loadModel() {
    if (!model) {
        model = await tf.loadLayersModel("./models/model.json");
        console.log("Model załadowany:", model.summary());
    }
    return model;
}

// Funkcja predykcji
async function predictDigit(data) {
    try {
        // Tworzenie tensora wejściowego o kształcie [1, 400] - 1 próbka, 400 cech
        const inputShape = [1, 400]; 
        const inputTensor = tf.tensor(data, inputShape);

        const model = await loadModel();
        const prediction = model.predict(inputTensor);

        // Normalizacja wyników predykcji
        const probabilities = prediction.softmax();
        const predictedClass = probabilities.argMax(1).dataSync()[0];

        console.log("Prediction:", predictedClass);
        return predictedClass;
    } catch (error) {
        console.error("Błąd przy wykonywaniu predykcji:", error);
    }
}
