document.addEventListener('DOMContentLoaded', async () => {
    await loadModel();
    console.log("Model loaded!");
});

const container = document.querySelector(".container");
const gridContainer = document.createElement("div");
const imgContainer = document.createElement("div");
gridContainer.id = "grid-container";
imgContainer.id = "img-container";
container.appendChild(gridContainer);
container.appendChild(imgContainer);

const generateButton = document.createElement('button');
generateButton.textContent = 'Generate Image';
let dataToPredction;
generateButton.addEventListener('click', async () => {
    dataToPredction = createImageFromGrid(imgContainer)
    console.log("data to prediction:");
    console.log(dataToPredction);

    // prediction
    const predictedDigit = await predictDigit(dataToPredction);
    alert(`Predicted digit: ${predictedDigit}`);
});
document.body.appendChild(generateButton);

function generateGrid(size = 100) {
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
