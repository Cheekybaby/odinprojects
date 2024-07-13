const DEFAULT_COLOR = '#777777'
const DEFAULT_SIZE = 16
const DEFAULT_MODE = 'color'

let current_color = DEFAULT_COLOR
let current_size = DEFAULT_SIZE
let current_mode = DEFAULT_MODE

function setCurrentColor(newColor) {
    current_color = newColor
}
function setCurrentSize(newSize){
    current_size = newSize
}
function setCurrentMode(newMode){
    activateButton(newMode)
    current_mode = newMode
}

const colorPicker = document.getElementById('color-picker')
const colorButton = document.getElementById('colorBtn')
const eraserButton = document.getElementById('eraserBtn')
const clearButton = document.getElementById('clearBtn')
const sizeValue = document.getElementById('size-value')
const rangeSlider = document.getElementById('size-slider')
const grid = document.getElementById('sketch-grid')

colorPicker.oninput = (e) => setCurrentColor(e.target.value)
colorButton.onclick = () => setCurrentMode('color')
eraserButton.onclick = () => setCurrentMode('eraser')
clearButton.onclick = () => reloadGrid()
rangeSlider.onmousemove = (e) => updateSizeValue(e.target.value)
rangeSlider.onchange = (e) => changeSize(e.target.value)

let mouseDown = false
document.body.onmouseup = () => (mouseDown = false)
document.body.onmousedown = () => (mouseDown = true)

function changeSize(value){
    setCurrentSize(value)
    updateSizeValue(value)
    reloadGrid()
}
function updateSizeValue(value){
    sizeValue.innerHTML = `${value} X ${value}`
}
function reloadGrid(){
    clearGrid()
    setupGrid(current_size)
}
function clearGrid(){
    grid.innerHTML = ''
}
function setupGrid(size){
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`

    for (let i=0; i<size*size; i+=1){
        const gridElement = document.createElement("div")
        gridElement.classList.add("grid-element")
        gridElement.addEventListener('mouseover', changeColor)
        gridElement.addEventListener('mousedown', changeColor)
        grid.appendChild(gridElement)
    }
}
function changeColor(e) {
    if (e.type === 'mouseover' && !mouseDown) return 
    if (current_mode === 'color'){
        e.target.style.backgroundColor = current_color
    } else if (current_mode === 'eraser'){
        e.target.style.backgroundColor = '#fefefe'
    }
}
function activateButton(newMode){
    if (current_mode === 'color'){
        colorButton.classList.remove('active')
    } else if (current_mode === 'eraser'){
        eraserButton.classList.remove('active')
    }

    if (newMode === 'color'){
        colorButton.classList.add('active')
    } else if (newMode === 'eraser'){
        eraserButton.classList.add('active')
    }
}

window.onload = () => {
    setupGrid(DEFAULT_SIZE)
    activateButton(DEFAULT_MODE)
}