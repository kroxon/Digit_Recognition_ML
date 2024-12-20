import './styles.css';
import { loadData, loadModel, predictDigit, predictDigit2, createModel, trainModel, saveModel } from './tensorflowModel';
import { setupCanvas, getCanvasImageData } from './canvas';

async function main() {
    let model;
    try {
        // const { X, y } = await loadData();

        // model = createModel();

        // const history = await trainModel(model, X, y);
        // console.log('Finished training:', history);
        // const save = await saveModel(model);

        // Load the pre-trained model
        model = await loadModel('/models/model.json');

        // await predictDigit(X, model, 3445); // Predict a example digit  

        // Setup canvas and add a button to predict the drawn digit
        setupCanvas(async () => {
            const imageData = getCanvasImageData();
            console.log(imageData.arraySync());
            const prediction = await predictDigit2(imageData, model);
            console.log(`Predicted digit: ${prediction}`);
        });

    } catch (err) {
        console.error('Error during training:', err);
    }



}

main();

