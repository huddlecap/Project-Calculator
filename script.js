const btn = document.querySelector('.btn');
const display = document.querySelector('.display');
const clearbtn = document.querySelector(".clear-btn");

// Button creation helper
function createButton(label, handler) {
  const button = document.createElement('button');
  button.textContent = label;
  button.addEventListener('click', handler);
  btn.appendChild(button);
}

let firstNumber = '';
let secondNumber = '';
let operator = '';
let isSecond = false;
let isResultDisplayed = false;

// Digit buttons (0–9)
for (let i = 0; i <= 9; i++) {
  createButton(i, () => {
    if (isResultDisplayed && operator === '') {
    firstNumber = '';
    secondNumber = '';
    isSecond = false;
    isResultDisplayed = false;
}
    if (!isSecond) {
      firstNumber += i;
    } else {
      secondNumber += i;
    }
    display.value = firstNumber + operator + secondNumber;
  });
}

// Operator buttons
['+', '-', 'x', '/'].forEach(op => {
  createButton(op, () => {
    if (firstNumber !== '' && !isSecond) {
      operator = op;
      isSecond = true;
      display.value = firstNumber + operator;
    }
  });
});

// Equal button
createButton('=', () => {
    if (firstNumber && secondNumber && operator) {
        const rawResult = operate(operator, firstNumber, secondNumber);
        if (rawResult === 'error') return; // stop here

        const result = roundResult(rawResult);
        display.value = result;
        isResultDisplayed = true;
        firstNumber = result.toString();
        secondNumber = '';
        operator = '';
        isSecond = false;
    }
});

// Delete button
createButton('del', () => {
  display.value = display.value.slice(0, -1);
  if (!isSecond) {
    firstNumber = firstNumber.slice(0, -1);
  } else {
    secondNumber = secondNumber.slice(0, -1);
  }
});

// Clear button
clearbtn.addEventListener('click', () => {
  firstNumber = '';
  secondNumber = '';
  operator = '';
  isSecond = false;
  display.value = '';
});

// Operation logic
function operate(op, a, b) {
  a = Number(a);
  b = Number(b);
  switch (op) {
    case '+': return a + b;
    case '-': return a - b;
    case 'x': return a * b;
    case '/':
        if (b === 0) {
            display.value = 'Nice try! Diddy';
            firstNumber = '';
            secondNumber = '';
            operator = '';
            isSecond = false;
            return 'error';
    }
        return a / b;
    default: return 'Invalid operator';
  }
}
// round the result
function roundResult(num) {
  return Math.round(num * 100000) / 100000; 
}


