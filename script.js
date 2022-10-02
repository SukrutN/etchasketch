// declare constants
const DEFAULT_SIZE = 20;
const DEFAULT_COLOR = '#FFD580';
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
slider.onmousemove = (e) => updateSize(e.target.value);
slider.onchange = (e) => shiftSize(e.target.value);
resetButton.onclick = () => resetGrid();
rainbowButton.onclick = () => setMode('rainbow');
eraserButton.onclick = () => setMode('eraser');
colorButton.onclick = () => setMode('color');

// maps mouse presses
let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

// set of functions that adjust grid size/updating/mode
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

function shiftSize(number) {
    setSize(number);
    updateSize(number);
    resetGrid();
}

function updateSize(number) {
    sizeValue.innerHTML = `${number} x ${number}`
}

function resetGrid() {
    grid.innerHTML = ''
    initGrid(currentSize);
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
function changeColor(e) {
    if (e.type === 'mouseover' && !mouseDown) return;
    if (currentMode === 'rainbow') {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        e.target.style.backgroundColor = `rgb(${r},${g},${b})`;
    } else if (currentMode === 'color' ) {
        e.target.style.backgroundColor = currentColor;
    } else if (currentMode === 'eraser') {
        e.target.style.backgroundColor = '#FFFFFF';
    }

}

// adjusts styles of button that is clicked
function triggerButton(newMode) {
    if (currentMode === 'rainbow') {
        rainbowButton.classList.remove('active');
    } else if (currentMode === 'color') {
        colorButton.classList.remove('active');
    } else if (currentMode === 'eraser') {
        eraserButton.classList.remove('active');
    }

    if (newMode === 'rainbow') {
        rainbowButton.classList.add('active');
    } else if (newMode === 'color') {
        colorButton.classList.add('active');
    } else if (newMode === 'eraser') {
        eraserButton.classList.add('active');
    }
}

// initializes buttons and grid when page is loaded
window.onload = () => {
    initGrid(DEFAULT_SIZE);
    activateButton(DEFAULT_MODE);
}