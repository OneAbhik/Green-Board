const canvas = document.getElementById('whiteboard');
const ctx = canvas.getContext('2d');

let painting = false;
let currentColor ='#000000';

// Start drawing
function startPosition(e) {
    painting = true;
    draw(e);  // Draw when mouse is pressed
}

// Stop drawing
function endPosition() {
    painting = false;
    ctx.beginPath();  // Stops the drawing path
}

// Draw on the canvas
function draw(e) {
    if (!painting) return;

    ctx.lineWidth = 5;  // Adjust brush thickness
    ctx.lineCap = 'round';
    ctx.strokeStyle = currentColor;  // Set stroke color

    ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);  // Draw a line
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);  // Reposition drawing point
}

// Change drawing color
document.getElementById('colorPicker').addEventListener('input', (e) => {
    currentColor = e.target.value;
});

// Clear the board
document.getElementById('clearButton').addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);  // Clears the canvas
});

// Event listeners for drawing
canvas.addEventListener('mousedown', startPosition);
canvas.addEventListener('mouseup', endPosition);
canvas.addEventListener('mousemove', draw);

// Function to resize the canvas dynamically
function resizeCanvas() {
    const canvas = document.getElementById('whiteboard');
    const ctx = canvas.getContext('2d');

    // Set canvas width and height based on window size
    canvas.width = window.innerWidth * 0.9; // 90% of window width
    canvas.height = window.innerHeight * 0.75; // 60% of window height

    // You may need to redraw the content here if the canvas is cleared on resizing
}

// Resize the canvas when the window is resized
window.addEventListener('resize', resizeCanvas);

// Call the function once when the page loads
resizeCanvas();
