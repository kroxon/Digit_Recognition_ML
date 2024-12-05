export function createImageFromGrid(imgContainer) {
    imgContainer.innerHTML = "";
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

    // Downsample the 100x100 image to 20x20
    const resizedCanvas = downsampleTo20x20(canvas);

    // Create an image from the resized canvas
    const imgElement = document.createElement("img");
    imgElement.src = resizedCanvas.toDataURL(); // Convert to image
    imgElement.classList.add("img-canvas");
    imgElement.style.imageRendering = "pixelated"; // Important: display image as sharp and pixelated
    imgContainer.appendChild(imgElement);

    // Convert the 20x20 canvas to MNIST format
    const resizedImageData = resizedCanvas.getContext("2d").getImageData(0, 0, 20, 20);
    const mnistData = convertImageDataToMNISTFormat(resizedImageData.data);

    return mnistData;
}

// Function to downsample 100x100 canvas to 20x20
function downsampleTo20x20(canvas) {
    const ctx = canvas.getContext("2d");
    const resizedCanvas = document.createElement("canvas");
    const resizedCtx = resizedCanvas.getContext("2d");

    resizedCanvas.width = 20;
    resizedCanvas.height = 20;

    resizedCtx.drawImage(canvas, 0, 0, 100, 100, 0, 0, 20, 20);

    return resizedCanvas;
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
