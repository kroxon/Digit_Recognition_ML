import './styles.css';

const container = document.querySelector(".container");
const gridContainer = document.createElement("div");
gridContainer.id = "grid-container";
container.appendChild(gridContainer);

const generateButton = document.createElement('button');
generateButton.textContent = 'Generate Image';
generateButton.addEventListener('click', createImageFromGrid);
document.body.appendChild(generateButton);

function generateGrid(size = 16) {
    gridContainer.innerHTML = "";
    for (let j = 0; j < size; j++) {
        const rowElement = document.createElement("div");
        rowElement.classList.add("row");
        for (let i = 0; i < size; i++) {
            let squareElement = document.createElement("div");
            squareElement.classList.add("square");
            squareElement.dataset.row = j; // Add attributes to identify the row
            squareElement.dataset.col = i; // Add attributes to identify the column
            squareElement.addEventListener("mouseover", () => {
                if (trigger === true) {
                    highlightCircle(j, i, 3, size);
                }
            });
            rowElement.appendChild(squareElement);
        }
        gridContainer.appendChild(rowElement);
    }
}

generateGrid(100); // Grid size: 100x100

let trigger = false;
document.addEventListener('mousedown', function () {
    trigger = true;
});

document.addEventListener('mouseup', function () {
    trigger = false;
});

function decrementBackground(square) {
    square.style.backgroundColor = `rgb(255, 255, 255)`;
}

// Function to highlight a circle with a given radius
function highlightCircle(centerRow, centerCol, radius, gridSize) {
    const rows = document.querySelectorAll('.row');

    for (let row = Math.max(0, centerRow - radius); row <= Math.min(gridSize - 1, centerRow + radius); row++) {
        for (let col = Math.max(0, centerCol - radius); col <= Math.min(gridSize - 1, centerCol + radius); col++) {
            const distance = Math.sqrt((row - centerRow) ** 2 + (col - centerCol) ** 2);

            if (distance <= radius) {
                const square = rows[row].children[col];
                decrementBackground(square);
            }
        }
    }
}

function createImageFromGrid() {
    let canvas = document.createElement("canvas");
    let ctx = canvas.getContext("2d");
    const rows = document.querySelectorAll('.row');
    const width = rows[0].children.length;
    const height = rows.length;

    canvas.width = width;
    canvas.height = height;

    // Drawing the image from the 100x100 grid
    for (let y = 0; y < height; y++) {
        const row = rows[y];
        for (let x = 0; x < width; x++) {
            const square = row.children[x];
            const rgb = window.getComputedStyle(square).backgroundColor;
            const [r, g, b] = rgb.match(/\d+/g).map(Number);

            ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
            ctx.fillRect(x, y, 1, 1);
        }
    }

    // Creating a scaled-down image of 20x20
    const resizedCanvas = document.createElement("canvas");
    const resizedCtx = resizedCanvas.getContext("2d");
    resizedCanvas.width = 20;
    resizedCanvas.height = 20;

    // Scaling the image from 100x100 to 20x20
    resizedCtx.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, 20, 20);

    // Adding the scaled-down image to the DOM
    const imgElement = document.createElement("img");
    imgElement.src = resizedCanvas.toDataURL(); // Convert to image
    imgElement.classList.add("img-canvas");
    imgElement.style.imageRendering = "pixelated"; // Important: display image as sharp and pixelated
    container.appendChild(imgElement);

    // Scale down to 20x20 pixels
    const resizedImageData = downsampleTo20x20(canvas);
    const mnistData = convertImageDataToMNISTFormat(resizedImageData);

    console.log(mnistData);
}

function downsampleTo20x20(canvas) {
    const ctx = canvas.getContext("2d");
    const originalImageData = ctx.getImageData(0, 0, 100, 100); // Data for the 100x100 image
    const data = originalImageData.data;

    const downsampledData = [];
    const blockSize = 5; // Combine 5x5 pixels into one

    for (let y = 0; y < 20; y++) {
        for (let x = 0; x < 20; x++) {
            let rSum = 0, gSum = 0, bSum = 0, count = 0;

            // Process the 5x5 block
            for (let j = 0; j < blockSize; j++) {
                for (let i = 0; i < blockSize; i++) {
                    const pixelX = x * blockSize + i;
                    const pixelY = y * blockSize + j;
                    const index = (pixelY * 100 + pixelX) * 4; // Index in the image data array

                    rSum += data[index];     // Red channel
                    gSum += data[index + 1]; // Green channel
                    bSum += data[index + 2]; // Blue channel
                    count++;
                }
            }

            // Average the color values
            const rAvg = Math.round(rSum / count);
            const gAvg = Math.round(gSum / count);
            const bAvg = Math.round(bSum / count);

            downsampledData.push(rAvg, gAvg, bAvg, 255); // Add color and alpha (fully opaque)
        }
    }

    // Create a new 20x20 image
    const resizedCanvas = document.createElement("canvas");
    const resizedCtx = resizedCanvas.getContext("2d");
    resizedCanvas.width = 20;
    resizedCanvas.height = 20;

    const newImageData = resizedCtx.createImageData(20, 20);
    newImageData.data.set(downsampledData);
    resizedCtx.putImageData(newImageData, 0, 0);

    return newImageData.data;
}

// Convert image data to MNIST format (1 for white, 0 for black)
function convertImageDataToMNISTFormat(imageData) {
    const mnistData = [];

    for (let i = 0; i < imageData.length; i += 4) {
        const r = imageData[i];
        const g = imageData[i + 1];
        const b = imageData[i + 2];
        const a = imageData[i + 3];

        const gray = (r + g + b) / 3;

        const threshold = 125;
        const scaledGray = gray > threshold ? 1.0 : 0.0;

        mnistData.push(scaledGray);
    }

    return mnistData;
}
