let display = document.getElementById('display');
let currentInput = '';
let currentOperator = null;
let firstOperand = null;
let shouldResetDisplay = false;

function clearDisplay() {
    currentInput = '';
    firstOperand = null;
    currentOperator = null;
    shouldResetDisplay = false;
    display.innerText = '0';
}

function toggleSign() {
    if (currentInput) {
        currentInput = (parseFloat(currentInput) * -1).toString();
        updateDisplay();
    }
}

function appendDigit(digit) {
    if (shouldResetDisplay) {
        currentInput = digit;
        shouldResetDisplay = false;
    } else if (currentInput === '0' && digit !== '.') {
        currentInput = digit;
    } else {
        currentInput += digit;
    }
    updateDisplay();
}

function appendOperator(operator) {
    if (currentInput !== '') {
        if (firstOperand === null) {
            firstOperand = parseFloat(currentInput);
        } else if (currentOperator) {
            firstOperand = performCalculation(firstOperand, parseFloat(currentInput), currentOperator);
            display.innerText = firstOperand;
        }
        currentInput = '';
        currentOperator = operator;
        shouldResetDisplay = true;
    }
    updateDisplay();
}

function performCalculation(first, second, operator) {
    switch (operator) {
        case '+':
            return first + second;
        case '-':
            return first - second;
        case '*':
            return first * second;
        case '/':
            return first / second;
        case '%':
            return first % second;
        default:
            return second;
    }
}

function calculateResult() {
    if (currentOperator && currentInput !== '') {
        const result = performCalculation(firstOperand, parseFloat(currentInput), currentOperator);
        display.innerText = result;
        currentInput = '';
        currentOperator = null;
        firstOperand = result;
        shouldResetDisplay = true;
    }
}

function updateDisplay() {
    display.innerText = currentInput || '0';
    if (currentOperator) {
        display.innerText = firstOperand + ' ' + currentOperator + ' ' + (currentInput || '');
    }
}
