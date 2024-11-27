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
            squareElement.dataset.row = j; // Dodanie atrybutów do identyfikacji
            squareElement.dataset.col = i; // wiersza i kolumny
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

generateGrid(100); // Siatka 16x16

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

// Funkcja podświetlająca koło o zadanym promieniu
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

    // Rysowanie obrazu z siatki
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

    // Generowanie URL dla obrazu
    const imageUrl = canvas.toDataURL();
    const imgElement = document.createElement("img");
    imgElement.src = imageUrl;
    imgElement.classList.add("img-canvas");

    container.appendChild(imgElement);

    // Skala do 20x20 px
    const imageData = resizeImageTo20x20(imgElement);
    const mnistData = convertImageDataToMNISTFormat(imageData);

    console.log(mnistData);
}

// Przekształcanie obrazu na 20x20, zachowując proporcje
function resizeImageTo20x20(imageElement) {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const width = imageElement.naturalWidth;
    const height = imageElement.naturalHeight;

    let newWidth, newHeight;

    // Obliczanie proporcji
    if (width > height) {
        newHeight = Math.round((20 / width) * height);
        newWidth = 20;
    } else {
        newWidth = Math.round((20 / height) * width);
        newHeight = 20;
    }

    canvas.width = 20;
    canvas.height = 20;

    ctx.drawImage(imageElement, 0, 0, newWidth, newHeight, (20 - newWidth) / 2, (20 - newHeight) / 2, newWidth, newHeight);

    const imageData = ctx.getImageData(0, 0, 20, 20);
    return imageData.data;
}

// Konwersja danych obrazu na format MNIST (0 dla białych, 1 dla czarnych)
function convertImageDataToMNISTFormat(imageData) {
    const mnistData = [];

    for (let i = 0; i < imageData.length; i += 4) {
        const r = imageData[i];
        const g = imageData[i + 1];
        const b = imageData[i + 2];
        const a = imageData[i + 3];

        const gray = (r + g + b) / 3;

        const threshold = 200;
        const scaledGray = gray > threshold ? 0.0 : 1.0;

        mnistData.push(scaledGray);
    }

    return mnistData;
}
