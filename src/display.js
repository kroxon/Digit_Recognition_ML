export function displayDigit(imageOfDigit) {

    const reshapedImage = imageOfDigit.reshape([20, 20]);   // Shape the image to 20x20
    const imageArray = reshapedImage.arraySync();   // Convert to array

    const rotatedImageArray = imageArray[0].map(
        (_, colIndex) => imageArray.map(row => row[colIndex])); // Rotate the image


    let container = document.getElementById('digitGrid');
    if (!container) {
        container = document.createElement('div');
        container.id = 'digitGrid';
        document.body.appendChild(container);
    }

    container.innerHTML = '';

    // Iterate over the image array and create a div for each cell
    for (const row of rotatedImageArray) {
        for (const value of row) {
            const cell = document.createElement('div');
            cell.style.width = '100%';
            cell.style.height = '100%';
            cell.className = value > 0.5 ? 'black' : 'white';
            container.appendChild(cell);
        }
    }
}

// display all digits with their predictions. this is input "    const predictionArray = await prediction.array();
// display it in #predictions every digit with % of prediction
// example: input: 00003108262535533868,0.0009058950818143785,0.039559148252010345,0.0017425552941858768,0.7987168431282043,0.006071418058127165,0.10247847437858582,0.0006101952749304473,0.03909112140536308,0.010793269611895084
export function displayPredictions(predictionsArray) {
    const container = document.getElementById('predictions');
    container.innerHTML = '';


    for (let i = 0; i < predictionsArray[0].length; i++) {
        // change every float from predictionsArray to percentage
        const percentage = (predictionsArray[0][i] * 100).toFixed(2);
        const digit = i;
        const prediction = predictionsArray[i];
        const div = document.createElement('div');
        div.className = 'prediction';
        div.innerHTML = `${digit} - ${percentage}%`;
        container.appendChild(div);
    }
}

