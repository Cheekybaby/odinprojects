let firstOperand = '';
let secondOperand = '';
let currentOperation = null;
let resetScreenFlag = false;

const numberBtn = document.querySelectorAll('[data-number]');
const operatorBtn = document.querySelectorAll('[data-operator]');
const decimalBtn = document.getElementById('decimal');
const equalsBtn = document.getElementById('equal');
const clearBtn = document.getElementById('clear');
const deleteBtn = document.getElementById('delete');
const lastOperationScreen = document.getElementById('current-input');
const currentOperationScreen = document.getElementById('new-input');

window.addEventListener('keydown', handleKeyboardInput);
equalsBtn.addEventListener('click', evaluate);
clearBtn.addEventListener('click', clear);
deleteBtn.addEventListener('click', deleteNumber);
decimalBtn.addEventListener('click', appendDecimal);

numberBtn.forEach((button) =>
    button.addEventListener('click', () => appendNumber(button.textContent))
);

operatorBtn.forEach((button) =>
    button.addEventListener('click', () => setOperation(button.textContent))
);

function appendNumber(number){
    if (currentOperationScreen.textContent === '0' || resetScreenFlag){
        resetScreen();
    }
    currentOperationScreen.textContent+=number;
}

function resetScreen(){
    currentOperationScreen.textContent = '';
    resetScreenFlag = false;
}

function clear() {
    lastOperationScreen.textContent = '';
    currentOperationScreen.textContent = '0';
    firstOperand = '';
    secondOperand = '';
    currentOperation = null;
}

function appendDecimal(){
    if (resetScreenFlag) resetScreen();
    if (currentOperationScreen.textContent === ''){
        currentOperationScreen.textContent = '0';
    }
    if (currentOperationScreen.textContent.includes('.')) return ;
    currentOperationScreen.textContent+='.';
}

function deleteNumber(){
    currentOperationScreen.textContent = currentOperationScreen.textContent.toString().slice(0,-1);
}

function setOperation(operator){
    if (currentOperation !== null) evaluate();
    firstOperand = currentOperationScreen.textContent;
    currentOperation = operator;
    lastOperationScreen.textContent = `${firstOperand} ${currentOperation}`;
    resetScreenFlag = true;
}

function evaluate(){
    if (currentOperation === null || resetScreenFlag) return;
    if (currentOperation === '/' && currentOperationScreen.textContent === '0'){
        alert('Division by 0 not allowed');
        return;
    }

    secondOperand = currentOperationScreen.textContent;
    currentOperationScreen.textContent = roundResult(
        operate(currentOperation, firstOperand, secondOperand)
    );
    lastOperationScreen.textContent = `${firstOperand} ${currentOperation} ${secondOperand} =`;
    currentOperation = null;
}

function roundResult(number){
    return Math.round(number * 1000)/1000;
}

function handleKeyboardInput(e) {
    if (e.key >= 0 && e.key <= 9) appendNumber(e.key);
    if (e.key === '.') appendDecimal();
    if (e.key === '=' || e.key ==='Enter') evaluate();
    if (e.key === 'Backspace') deleteNumber();
    if (e.key === 'Escape') clear();
    if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/'){
        setOperation(convertOperator(e.key));
    }
}

function convertOperator(keyboardOperator){
    if (keyboardOperator === '/') return '/';
    if (keyboardOperator === '*') return 'x';
    if (keyboardOperator === '-') return '-';
    if (keyboardOperator === '+') return '+';
}

function add(a, b){
    return a+b;
}
function subtract(a, b){
    return a-b;
}
function multiply(a, b){
    return a*b;
}
function divide(a, b){
    return a/b;
}

function operate(operator, a, b){
    a = Number(a);
    b = Number(b);
    switch(operator){
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case 'x':
            return multiply(a, b);
        case '/':
            if (b === 0) return null;
            else return divide(a, b);
        default:
            return null;
    }
}