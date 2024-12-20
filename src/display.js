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

export function displayPredictions(predictionsArray) {
    const container = document.getElementById('predictions');
    container.innerHTML = '';


    for (let i = 0; i < predictionsArray[0].length; i++) {
        const percentage = (predictionsArray[0][i] * 100).toFixed(2);
        const digit = i;
        const prediction = predictionsArray[i];
        const div = document.createElement('div');
        div.className = 'prediction';
        div.innerHTML = `${digit} - ${percentage}%`;
        container.appendChild(div);
    }
}

