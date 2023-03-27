class Calculator {
    constructor(currentOperandTextElement, currentOperand, historyTextElement, updateHistoryArr) {
        this.currentOperandTextElement = currentOperandTextElement;
        this.currentOperand = currentOperand;
        this.historyTextElement = historyTextElement;
        this.memoryDisplayTextElement = memoryDisplayTextElement;
        this.updateHistoryArr = updateHistoryArr;
        this.clear();
        this.memoryClear();
    }

clear() {
    this.currentOperand = '0';
    this.operation = undefined;
    this.isDecimalAllowed = '1';
    this.isZeroPrefixAllowed = '0';
    this.previousInput = '';
    this.isMemoryRecalled = '0';
    this.computation = '';
}

memoryClear() {
    this.memoryDisplay = 'M';
    this.memoryValue = '';
    this.memoryDisplayTextElement.style.visibility = 'hidden';
}

memoryStore() {
    let current = parseFloat(this.currentOperand);
    if (isNaN(current)) return;
    if (this.currentOperand === '') return
    this.memoryDisplay = 'M';
    if (current.toString().endsWith(this.operation)) current.slice(0, -1);
    this.memoryValue = parseFloat(current);
    this.memoryDisplayTextElement.style.visibility = 'visible';
}

memoryRecall() {
    if (this.memoryValue === '') return;  
    if (this.currentOperand === this.memoryValue) return;
    if (this.previousInput === this.memoryValue && this.computation === '') return;
    if (this.currentOperand !== '' && this.operation !== undefined && !(this.currentOperand.endsWith(this.operation))) this.currentOperand = '';
    if (this.currentOperand !== '' && !(this.isOperation())) this.currentOperand = '';
    this.appendNumber(this.memoryValue); 
    this.isMemoryRecalled = '1'; 
}

memoryAdd() {
    let current = parseFloat(this.currentOperand);
    if (isNaN(current)) return;
    if (this.currentOperand === '') return;
    if (current.toString().endsWith(this.operation)) current.slice(0, -1);
    this.memoryValue = parseFloat(this.memoryValue) + parseFloat(current);    
}

memorySubtract() {
    let current = parseFloat(this.currentOperand);
    if (isNaN(current)) return;
    if (this.currentOperand === '') return;
    if (current.toString().endsWith(this.operation)) current.slice(0, -1);
    this.memoryValue = parseFloat(this.memoryValue) - parseFloat(current);    
}

backspace(input) {
    if (input === 'default' && this.currentOperand === '0') return;
    if (input === 'default' && this.length() === 1) {
        this.currentOperand = '0';
        this.isZeroPrefixAllowed = '0';
        return;
    }   
    if (this.currentOperand.endsWith('.')) {
        this.isDecimalAllowed = '1';
        this.isZeroPrefixAllowed = '0';
    } 
    this.currentOperand = this.currentOperand.toString().trimEnd();
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
    if (!(this.currentOperand.endsWith(this.operation)))  this.currentOperand = this.currentOperand.toString().trimEnd();
    if (this.currentOperand.endsWith(this.operation)) this.isZeroPrefixAllowed = '0';
}

appendNumber(input) {
    if (this.computation !== '' && input!== this.operation) this.clear();
    if (this.length() > 23) return;
    if (input === '.' && this.currentOperand.endsWith('.')) return;
    if (input === '.' && this.isDecimalAllowed === '0') return;
    if (input === '0' && this.isZeroPrefixAllowed === '0' && this.currentOperand === '0') return;
    if (this.currentOperand.endsWith('0') && this.isZeroPrefixAllowed === '0' && input !== '.' && input !== this.operation) this.backspace('append');
    if (this.isMemoryRecalled === '1' && input !== this.operation) {
        this.currentOperand = '';
        this.isMemoryRecalled = '0'
        this.isDecimalAllowed = '1';
        this.isZeroPrefixAllowed = '0';
    }
    if (input === '.' && this.currentOperand === '') {
        input = '0.';
        this.isDecimalAllowed = '0';
    }
    if (input === '.' && this.currentOperand.endsWith(this.operation)) {
        input = '0.';
        this.isDecimalAllowed = '0';
    }
    this.currentOperand = this.currentOperand.toString() + input.toString();
    if (input == '0' && this.currentOperand == '0') this.isZeroPrefixAllowed = '0';
    if (input === '.' ) {
        this.isDecimalAllowed = '0';
        this.isZeroPrefixAllowed = '1';
    }
    if (input !== '0') this.isZeroPrefixAllowed = '1';
    if (this.currentOperand.endsWith(this.operation)) this.isZeroPrefixAllowed = '0';
    this.computation = '';
    this.previousInput = input;
}

chooseOperation (operation) {
//    if (this.computation) return;
console.log(this.currentOperand)
    if (this.currentOperand === '') return;
    if (this.isOperation() && this.currentOperand.endsWith(this.operation)) {
        this.backspace();
    }
    if (this.isOperation() && this.currentOperand.endsWith('.')) {
        this.backspace();
    }
    this.operation = operation;
    operation = '';
    this.isDecimalAllowed = '1';
    console.log(this.operation)
    this.appendNumber(this.operation)
}

compute() {
    let current = parseFloat(this.currentOperand);
    //if (this.currentOperand.endsWith(this.operation) || this.currentOperand.endsWith(".")) this.backspace(); // in caz ca ultimul char este . sau operator, sterge ultimul char.
    if (this.currentOperand.endsWith(this.operation) || this.currentOperand.endsWith(".")) return; // // in caz ca ultimul char este . sau operator, ignora.
    if (isNaN(current)) return;
    if (!this.operation) return;
    if (!this.isOperation()) return;
    this.computation = eval(this.currentOperand);
    this.history = this.currentOperand.toString() + " " + "=" + " " + this.computation.toString();
    this.operation = undefined;
    this.currentOperand = this.computation.toString();
    console.log(this.computation)
    this.updateHistory();     
}

updateDipslay() {
    this.currentOperandTextElement.innerText = this.currentOperand;
}

updateMemoryDipslay() {  
    this.memoryDisplayTextElement.innerText = this.memoryDisplay;
}

updateHistory() {
    updateHistoryArr.splice(updateHistoryArr.length, 1, this.history);
    if(updateHistoryArr.length == 6) updateHistoryArr.shift();
    this.historyTextElement.innerHTML = updateHistoryArr.join("<br>"); 
}

isOperation() {
    let isOperation = this.currentOperand.toString()
    if (isOperation.includes('+') || isOperation.includes('-') || isOperation.includes('*') ||isOperation.includes('/')) return true;
}

length() {
    let currentOperandLenght = this.currentOperand.toString().length;
    return currentOperandLenght;
}
}

const numberButtons = document.querySelectorAll('.number');
const operationButtons = document.querySelectorAll('.operator');
const equalsButton = document.getElementById('equal');
const backspaceButton = document.getElementById('backspace');
const allClearButton = document.getElementById('all-clear');
const memoryValue = '';
const currentOperandTextElement = document.getElementById('operationSpan');
const currentOperand = ''; 
const historyTextElement = document.getElementById('hd');
let updateHistoryArr = []//[' ', ' ', ' ', ' ', ' '];
const memoryDisplayTextElement = document.getElementById('memorySpan');
const memoryStoreButton = document.getElementById('memory-store');
const memoryClearButton = document.getElementById('memory-clear');
const memoryRecallButton = document.getElementById('memory-recall');
const memoryAddButton = document.getElementById('memory-add');
const memorySubtractButton = document.getElementById('memory-subtract');
const computation = '';
const isDecimalAllowed = '';
const isZeroPrefixAllowed = '';
const isMemoryRecalled = '';
const previousInput = '';

const calculator = new Calculator(currentOperandTextElement, currentOperand, historyTextElement, memoryDisplayTextElement, updateHistoryArr);
calculator.updateDipslay();

numberButtons.forEach(div => {
    div.addEventListener('click', () => {
        calculator.appendNumber(div.innerText);
        calculator.updateDipslay();
    })
})

operationButtons.forEach(div => {
    div.addEventListener('click', () => {
        calculator.chooseOperation(' ' + div.innerText + ' ');
        calculator.updateDipslay();
    })
})

allClearButton.addEventListener('click', div => {
    calculator.clear();
    calculator.updateDipslay();
    calculator.updateMemoryDipslay();
})

equalsButton.addEventListener('click', div => {
    calculator.compute();
    calculator.updateDipslay();
})

backspaceButton.addEventListener('click', div => {
    calculator.backspace('default');
    calculator.updateDipslay();
})

memoryClearButton.addEventListener('click', div => {
    calculator.memoryClear();
    calculator.updateMemoryDipslay();
})

memoryStoreButton.addEventListener('click', div => {
    calculator.memoryStore();
    calculator.updateMemoryDipslay();
})

memoryRecallButton.addEventListener('click', div => {
    calculator.memoryRecall();
    calculator.updateDipslay();
})

memoryAddButton.addEventListener('click', div => {
    calculator.memoryAdd();
})

memorySubtractButton.addEventListener('click', div => {
    calculator.memorySubtract();
})