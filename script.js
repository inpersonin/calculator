function add(num1,num2) {
    return num1 + num2;
}
function subtract(num1,num2) {
    return num1 - num2;
}
function multiply(num1,num2) {
    return num1 * num2;
}
function divide(num1,num2) {
    return num1 / num2;
}
function operate(operator, num1, num2) {
    switch (operator) {
        case "+": return add(num1, num2);
        case "-": return subtract(num1, num2);
        case "*": return multiply(num1, num2);
        case "/":
            if (num2 === 0) {
                alert("Cannot divide by zero");
                return null;
            }
            return divide(num1, num2);
        default:
            alert("Invalid operation");
            return null;
    }
}

const calculator = document.createElement('div');
calculator.style.display = 'flex';
calculator.style.flexDirection = 'column';
calculator.style.justifyContent = "center";
calculator.style.alignItems = "center";
calculator.style.marginTop = '100px';
calculator.style.fontFamily = "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";

const display = document.createElement("div");
display.style.width = '400px';
display.style.height = '120px';
display.style.backgroundColor = '#1e1e2f';
display.style.color = 'white';
display.style.fontSize = '36px';
display.style.display = 'flex';
display.style.justifyContent = 'flex-start';
display.style.textIndent = '20px';
display.style.alignItems = 'center';
display.style.borderTopLeftRadius = '10px';
display.style.borderTopRightRadius = '10px';
display.style.padding ='3px';
display.style.boxShadow = '0 0 10px rgba(0,0,0,0.3)';
display.textContent = '';

calculator.appendChild(display);

const numgrid = document.createElement('div');
numgrid.style.display = 'flex';
numgrid.style.flexDirection = 'column';
numgrid.style.borderBottomLeftRadius = '10px';
numgrid.style.borderBottomRightRadius = '10px';
numgrid.style.overflow = 'hidden';

numgrid.style.boxShadow = '0 0 15px rgba(0,0,0,0.2)';

let number = 1;
const columnValues = ['←', '+', '-'];
let firstNumber = null;
let secondNumber = null;
let operator = null;
let currentInput = '';
let justCalculated = false;

function createButton(text) {
    const btn = document.createElement('div');
    btn.textContent = text;
    btn.style.width = '100px';
    btn.style.height = '100px';
    btn.style.display = 'flex';
    btn.style.justifyContent = 'center';
    btn.style.alignItems = 'center';
    btn.style.fontSize = '28px';
    btn.style.cursor = 'pointer';
    btn.style.border = '1px solid #444';
    btn.style.backgroundColor = '#2e2e3e';
    btn.style.color = 'white';
    btn.style.transition = 'all 0.1s ease-in-out';

    btn.addEventListener('mousedown', () => {
        btn.style.transform = 'scale(0.95)';
        btn.style.backgroundColor = '#444459';
    });
    btn.addEventListener('mouseup', () => {
        btn.style.transform = 'scale(1)';
        btn.style.backgroundColor = '#2e2e3e';
    });
    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'scale(1)';
        btn.style.backgroundColor = '#2e2e3e';
    });

    return btn;
}

for (let row = 0; row < 3; row++) {
    const rowDiv = document.createElement('div');
    rowDiv.style.display = 'flex';

    for (let col = 0; col < 3; col++) {
        const numcell = createButton(number++);
        numcell.addEventListener('click', function () {
            if (justCalculated) {
                currentInput = '';
                justCalculated = false;
            }
            currentInput += this.textContent;
            display.textContent = currentInput;
        });
        rowDiv.appendChild(numcell);
    }

    const extraCol = createButton(columnValues[row]);
    extraCol.addEventListener('click', function () {
        const op = this.textContent;
        if (op === '←' && currentInput !== '') {
            currentInput = currentInput.slice(0, -1);
            display.textContent = currentInput || '0';
            return;
        }

        if (['+', '-'].includes(op)) {
            if (currentInput !== '') {
                firstNumber = parseFloat(currentInput);
                operator = op;
                currentInput = `${firstNumber} ${operator} `;
                display.textContent = currentInput;
                justCalculated = false;
            }
        }
    });

    rowDiv.appendChild(extraCol);
    numgrid.appendChild(rowDiv);
}

const lastRow = document.createElement('div');
lastRow.style.display = 'flex';

['0', '*', '/', '='].forEach((val) => {
    const btn = createButton(val);
    btn.addEventListener('click', function () {
        if (val === '=') {
            if (firstNumber !== null && operator && currentInput !== '') {
                let parts = currentInput.split(' ');
                let lastPart = parts[parts.length - 1];
                secondNumber = parseFloat(lastPart);
                if (isNaN(secondNumber)) {
                    display.textContent = "Error";
                    return;
                }
                const result = operate(operator, firstNumber, secondNumber);
                if (result !== null) {
                    display.textContent = result;
                    currentInput = result.toString();
                    justCalculated = true;
                } else {
                    display.textContent = "Error";
                }
                firstNumber = null;
                secondNumber = null;
                operator = null;
            }
        } else if (['*', '/'].includes(val)) {
            if (currentInput !== '') {
                firstNumber = parseFloat(currentInput);
                operator = val;
                currentInput = `${firstNumber} ${operator} `;
                display.textContent = currentInput;
                justCalculated = false;
            }
        } else {
            if (justCalculated) {
                currentInput = '';
                justCalculated = false;
            }
            currentInput += val;
            display.textContent = currentInput;
        }
    });

    lastRow.appendChild(btn);
});

numgrid.appendChild(lastRow);
calculator.appendChild(numgrid);
document.body.style.backgroundColor = "#121212";
document.body.appendChild(calculator);
