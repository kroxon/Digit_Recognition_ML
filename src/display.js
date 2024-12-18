export function displayDigit(imageOfDigit) {
    const reshapedImage = imageOfDigit.reshape([20, 20]);   // Shape the image to 20x20
    const imageArray = reshapedImage.arraySync();   // Convert to array

    const rotatedImageArray = imageArray[0].map(
        (_, colIndex) => imageArray.map(row => row[colIndex])); // Rotate the image


    let container = document.getElementById('digitGrid');
    if (!container) {
        console.log("Creating container...");
        container = document.createElement('div');
        container.id = 'digitGrid';
        container.style.display = 'grid';
        container.style.gridTemplateColumns = 'repeat(20, 1fr)';
        container.style.gridTemplateRows = 'repeat(20, 1fr)';
        container.style.width = '200px';
        container.style.height = '200px';
        container.style.gap = '1px';
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