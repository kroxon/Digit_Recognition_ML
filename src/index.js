import './styles.css';

const container = document.querySelector(".container");
const gridContainer = document.createElement("div");
gridContainer.id = "grid-container";
container.appendChild(gridContainer);

const generateButton = document.createElement('button');
generateButton.textContent = 'Generate Image';
generateButton.addEventListener('click', createImageFromGrid);
document.body.appendChild(generateButton);

let drawing_to_prediction = new Array(400).fill(0);
console.log(drawing_to_prediction);

function generateGrid(size = 16) {
    gridContainer.innerHTML = "";
    for (let j = 0; j < size; j++) {
        const rowElement = document.createElement("div");
        rowElement.classList.add("row");
        for (let i = 0; i < size; i++) {
            let squareElement = document.createElement("div");
            squareElement.classList.add("square");
            squareElement.addEventListener("mouseover", () => {
                if (trigger === true) {
                    decrementBackground(squareElement);
                    drawing_to_prediction[j * 20 + i] = 1;
                }
            });
            rowElement.appendChild(squareElement);
        }
        gridContainer.appendChild(rowElement);
    }
}

generateGrid(20);

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

function createImageFromGrid() {
    let canvas = document.createElement("canvas");
    let ctx = canvas.getContext("2d");
    const rows = document.querySelectorAll('.row');
    const width = rows[0].children.length;
    const height = rows.length;

    canvas.width = width;
    canvas.height = height;

    let input_digit = [];

    // drawing and creating array
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

    const imageUrl = canvas.toDataURL();
    const imgElement = document.createElement("img");
    imgElement.src = imageUrl;
    imgElement.classList.add("img-canvas");

    container.appendChild(imgElement);

    const imageData = resizeImageTo20x20(imgElement);

    console.log(drawing_to_prediction);
}

function resizeImageTo20x20(imageElement) {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const width = imageElement.naturalWidth;
    const height = imageElement.naturalHeight;

    let newWidth, newHeight;

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
