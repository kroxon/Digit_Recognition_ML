const tf = window.tf;

let model = null;

// Funkcja ładowania modelu
async function loadModel() {
    try {
        const modelPath = "./models/model.json";
        const loadedModel = await tf.loadLayersModel(modelPath);


        console.log("Model załadowany poprawnie:", model.summary());
        return model;
    } catch (error) {
        console.error("Błąd przy ładowaniu modelu:", error);
    }
}

// Funkcja predykcji
async function predictDigit(data) {
    try {
        const model = await loadModel();

        // Tworzenie tensora wejściowego o kształcie [1, 400] - 1 próbka, 400 cech
        const inputShape = [1, 400];
        const inputTensor = tf.tensor(data, inputShape);

        // Wykonanie predykcji
        const prediction = model.predict(inputTensor);

        // Wybranie klasy o najwyższym prawdopodobieństwie
        const predictedClass = prediction.argMax(1).dataSync()[0];

        console.log("Prediction:", predictedClass);
        return predictedClass;
    } catch (error) {
        console.error("Błąd przy wykonywaniu predykcji:", error);
    }
}
