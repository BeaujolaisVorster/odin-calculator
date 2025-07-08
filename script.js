function add(a,b){
    return a + b;
}

function subtract (a, b){
    return a - b;
}

function multiply (a, b){
    return a * b;
}

function divide (a, b){
    if (b === 0) {
    return "Nope";
  }
    return a / b
};

function operate(operator, a, b) {
  a = parseFloat(a);
  b = parseFloat(b);

  switch (operator) {
    case "+":
      return add(a, b);
    case "-":
      return subtract(a, b);
    case "x":
      return multiply(a, b);
    case "/":
      return divide(a, b);
    default:
      return null;
  }
}

/* UI */

let firstNumber = '';
let secondNumber = '';
let currentOperator = null;
let resultDisplayed = false;

const display = document.getElementById('display');
const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const equalsButton = document.getElementById('equals');
const clearButton = document.getElementById('clear');


numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.textContent;

    if (resultDisplayed) {
      firstNumber = '';
      secondNumber = '';
      currentOperator = null;
      resultDisplayed = false;
      display.textContent = '';
    }

    if (value === '.') {
      if (!currentOperator && firstNumber.includes('.')) return;
      if (currentOperator && secondNumber.includes('.')) return;
    }

    if (!currentOperator) {
      firstNumber += value;
      display.textContent = firstNumber;
    } else {
      secondNumber += value;
      display.textContent = secondNumber;
    }
  });
});




operatorButtons.forEach(button => {
  button.addEventListener('click', () => {
    if (currentOperator && !secondNumber) {
      currentOperator = button.textContent;
      return;
    }

    if (firstNumber && secondNumber) {
      let result = operate(currentOperator, firstNumber, secondNumber);
      if (typeof result === "number") {
        result = Math.round(result * 1000) / 1000;
      }
      firstNumber = result.toString();
      secondNumber = '';
      display.textContent = firstNumber;
    }

    currentOperator = button.textContent;
    resultDisplayed = false;
  });
});



equalsButton.addEventListener('click', () => {
  if (firstNumber && secondNumber && currentOperator) {
    let result = operate(currentOperator, firstNumber, secondNumber);
if (typeof result === "number") {
  result = Math.round(result * 1000) / 1000;
}
    display.textContent = result;
    firstNumber = result.toString();
    secondNumber = '';
    currentOperator = null;
    resultDisplayed = true;
  }
});


clearButton.addEventListener('click', () => {
  firstNumber = '';
  secondNumber = '';
  currentOperator = null;
  display.textContent = '0';
});

const backspaceButton = document.getElementById('backspace');

backspaceButton.addEventListener('click', () => {
  if (resultDisplayed) {
    
    firstNumber = '';
    secondNumber = '';
    currentOperator = null;
    resultDisplayed = false;
    display.textContent = '0';
    return;
  }

  if (currentOperator && secondNumber) {
    
    secondNumber = secondNumber.slice(0, -1);
    display.textContent = secondNumber || '0';
  } else if (!currentOperator && firstNumber) {
    
    firstNumber = firstNumber.slice(0, -1);
    display.textContent = firstNumber || '0';
  }
});


document.addEventListener('keydown', (e) => {
  const key = e.key;

  // If number or decimal
  if ((key >= '0' && key <= '9') || key === '.') {
    // Simulate click on matching number button
    document.querySelectorAll('.number').forEach(button => {
      if (button.textContent === key) button.click();
    });
  }

  
  if (['+', '-', '/', 'x', '*'].includes(key)) {
    const opKey = (key === '*') ? 'x' : key;
    document.querySelectorAll('.operator').forEach(button => {
      if (button.textContent === opKey) button.click();
    });
  }

  
  if (key === 'Enter' || key === '=') {
    equalsButton.click();
  }

 
  if (key === 'Backspace') {
    backspaceButton.click();
  }

  if (key === 'Escape') {
    clearButton.click();
  }
});


