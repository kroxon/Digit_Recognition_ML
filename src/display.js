function createImageFromGrid(container) {
    container.innerHTML = "";
    let canvas = document.createElement("canvas");
    let ctx = canvas.getContext("2d");
    const rows = document.querySelectorAll('.row');
    const width = rows[0].children.length;
    const height = rows.length;

    canvas.width = width;
    canvas.height = height;

    // Drawing the image from the grid
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

    // Scaling the image from grid dimensions to 20x20
    resizedCtx.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, 20, 20);

    // Adding the scaled-down image to the DOM
    const imgElement = document.createElement("img");
    imgElement.src = resizedCanvas.toDataURL(); // Convert to image
    imgElement.classList.add("img-canvas");
    imgElement.style.imageRendering = "pixelated"; // Important: display image as sharp and pixelated
    container.appendChild(imgElement);
}

export { createImageFromGrid };
