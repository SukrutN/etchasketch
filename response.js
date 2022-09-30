// declare constants
const DEFAULT_SIZE = 16;
const DEFAULT_COLOR = '#333333';
const DEFAULT_MODE = 'color';

let currentColor = DEFAULT_COLOR;
let currentSize = DEFAULT_SIZE;
let currentMode = DEFAULT_MODE;

// returns elements we want to edit in relation to the DOM
const grid = document.getElementById('grid');
const colorButton = document.getElementById('colorButton');
const rainbowButton = document.getElementById('rainbowButton');
const resetButton = document.getElementById('resetButton');
const eraserButton = document.getElementById('eraserButton');
const sizeValue = document.getElementById('sizeValue');
const slider = document.getElementById('slider');
const colorChoice = document.getElementById('colorChoice');

// events that give interactivity
colorChoice.oninput = (e) => setColor(e.target.value);
slider.onchange = (e) => setSize(e.target.value);
slider.onmousemove = (e) => changeSize(e.target.value);
resetButton.onclick = () => resetGrid();
rainbowButton.onclick = () => setMode('rainbow');
eraserButton.onclick = () => setMode('eraser');
colorButton.onclick = () => setMode('color');

let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

function setSize(newSize) {
    currentSize = newSize;
}

function setMode(newMode) {
    triggerButton(newMode);
    currentMode = newMode;
}

function setColor(newColor) {
    currentColor = newColor;
}


// initializes grid w/ event listeners
function initGrid(size) {
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    for (let i = 0; i < size ** 2; i++) {
        const gridElement = document.createElement('div');
        gridElement.classList.add('grid-element');
        gridElement.addEventListener('mouseover', changeColor);
        gridElement.addEventListener('mousedown', changeColor);
        grid.appendChild(gridElement);
    }
}

// adjusts how the divs are colored based on user selection
function changeColor {
    if (e.type === 'mouseover' && !mouseDown) return;
    if (currentMode === 'rainbow') {
        const r = Math.floor(Math.random * 256);
        const g = Math.floor(Math.random * 256);
        const b = Math.floor(Math.random * 256);
        e.target.style.backgroundColor = `rgb(${r},${g},${b})`;
    } else if (currentMode === 'color' ) {
        e.target.style.backgroundColor = currentColor;
    } else if (currentMode === 'eraser') {
        e.target.style.backgroundColor = '#FFFFFF';
    }

}



