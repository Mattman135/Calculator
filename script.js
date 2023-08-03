// Buttons
const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const clearButton = document.querySelector('[data-clear]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

// Global variables
let previousOperand = "";
let currentOperand = "";
let operator = "";

// Functions
function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) {
        console.log(a, b);
        return "ERROR";
    } else {
        return a / b;
    }
}

function operate(previous, current, operator) {
    let a = parseFloat(previous);
    let b = parseFloat(current);
    switch (operator) {
        case "+":
            return add(a, b);
            break;
        case "-":
            return subtract(a, b);
            break;
        case "*":
            return multiply(a, b);
            break;
        case "/":
            return divide(a, b);
            break;
        case "÷":
            return divide(a, b);
            break;
        default:
            return "ERROR";
    }
}

function updateDisplay() {
   previousOperandTextElement.innerHTML = previousOperand + " " + operator;
   if (currentOperand === "") {
    currentOperandTextElement.innerHTML = currentOperand;
   } else {
    currentOperandTextElement.innerHTML = currentOperand; //parseFloat(currentOperand).toLocaleString();
   }
}

function clear() {
    currentOperand = "";
    previousOperand = "";
    operator = "";
    updateDisplay();
}

function _delete() {
    if (currentOperand !== "") {
        currentOperand = currentOperand.slice(0, -1);
        updateDisplay();
    }
}

function equals() {
    if (previousOperand === "" || currentOperand === "" || operator === "") return;
    //console.log(previousOperand, operator, currentOperand);
    currentOperand = operate(previousOperand, currentOperand, operator).toString();
    previousOperand = "";
    operator = "";
    updateDisplay();
}


// Listeners
numberButtons.forEach(button => {
    button.addEventListener("click", () => {
        currentOperand += button.innerHTML;
        updateDisplay();
    })
})

operationButtons.forEach(button => {
    button.addEventListener("click", () => {
        if (operator === "") {
            previousOperand = currentOperand;
            operator = button.innerHTML;
            currentOperand = "";
            updateDisplay();
        } else {
            previousOperand = operate(previousOperand, currentOperand, operator).toString();
            operator = button.innerHTML;
            currentOperand = "";
            updateDisplay();
        }
    })
})

equalsButton.addEventListener("click", () => {
    equals();
})

clearButton.addEventListener("click", () => {
    clear();
})

deleteButton.addEventListener("click", () => {
    _delete();
})

// Keyboard support

let numbers = ".0123456789";
let operators = "+-*/=";

window.addEventListener("keydown", (event) => {

    if (event.key === "Shift") return;
    if (!numbers.includes(event.key) && !operators.includes(event.key)) return;

    let key = event.key;
    console.log

    if (operators.includes(key)) {
        if (operator === "" && key !== "=") {
            previousOperand = currentOperand;
            operator = key;
            currentOperand = "";
            updateDisplay();
        } else if ("+-*/".includes(key)){
            previousOperand = operate(previousOperand, currentOperand, operator).toString();
            operator = key;
            currentOperand = "";
            updateDisplay();
        } else if (key === "=") {
            equals();
            updateDisplay();
        }
    }

    if (numbers.includes(key)) {
        currentOperand += key;
        updateDisplay();
    }
})