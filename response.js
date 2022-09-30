const DEFAULT_SIZE = 16
const DEFAULT_COLOR = '#333333'
const DEFAULT_MODE = 'color'

let currentColor = DEFAULT_COLOR
let currentSize = DEFAULT_SIZE
let currentMode = DEFAULT_MODE


const grid = document.getElementById('grid');

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


let mouseDown = false
document.body.onmousedown = () => (mouseDown = true)
document.body.onmouseup = () => (mouseDown = false)


function changeColor {
    if (e.type === 'mouseover' && !mouseDown) return
    if (currentMode === 'rainbow') {
        const r = Math.floor(Math.random * 256)
        const g = Math.floor(Math.random * 256)
        const b = Math.floor(Math.random * 256)
        e.target.style.backgroundColor = `rgb(${r},${g},${b})`
    } else if (currentMode === 'color' ) {
        e.target.style.backgroundColor = currentColor
    } else if (currentMode === 'eraser') {
        e.target.style.backgroundColor = '#FFFFFF'
    }

}

