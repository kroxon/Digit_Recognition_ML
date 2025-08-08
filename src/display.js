import { setupCanvas } from "./canvas";

export function displayDigit(imageOfDigit, largestPredictionIndex) {

    const reshapedImage = imageOfDigit.reshape([20, 20]);   // Shape the image to 20x20
    const imageArray = reshapedImage.arraySync();   // Convert to array

    const rotatedImageArray = imageArray[0].map(
        (_, colIndex) => imageArray.map(row => row[colIndex])); // Rotate the image

    let container = document.getElementById('digitResult');

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

let chartInstance = null;


export function displayPredictions(predictionsArray, largestPredictionIndex) {
    // Ensure the combined preview panel is visible
    const resultPreview = document.getElementById('resultPreview');
    resultPreview?.classList.remove('is-hidden');

    const label = document.getElementById('predictionLabel');
    label.innerHTML = `Predicted digit: ${largestPredictionIndex}<br>with ${(predictionsArray[0][largestPredictionIndex] * 100).toFixed(2)}% of certainty`;

    const ctx = document.getElementById('chart').getContext('2d');


    if (chartInstance) {
        chartInstance.destroy();
    }

    chartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Array.from({ length: 10 }, (_, i) => i),
            datasets: [{
                label: 'Predictions',
                data: predictionsArray[0].map(prediction => prediction * 100),
                backgroundColor: 'rgba(0, 0, 255, 0.2)',
                borderColor: 'rgba(0, 0, 255, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false, // fill the container height we defined in CSS
            animation: { duration: 500 },
            scales: {
                x: {
                    ticks: {
                        font: { size: 16 },
                        color: 'white',
                    }
                },
                y: {
                    beginAtZero: true,
                    ticks: {
                        font: { size: 16 },
                        color: 'white',
                    }
                }
            },
            plugins: {
                legend: {
                    labels: {
                        font: { size: 16 },
                        color: 'white',
                    }
                }
            }
        }
    });
}

export function destroyChart() {
    if (chartInstance) {
        chartInstance.destroy();
        chartInstance = null;
    }
}