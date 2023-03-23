class Calculator {
    constructor(currentOperandTextElement, historyTextElement, updateHistoryArr) {
        this.currentOperandTextElement = currentOperandTextElement;
        this.historyTextElement = historyTextElement;
        this.memoryDisplayTextElement = memoryDisplayTextElement;
        this.updateHistoryArr = updateHistoryArr;
        this.clear();
        this.memoryClear();
    }

clear() {
    this.currentOperand = '';
    this.operation = undefined;
    this.historyClear();
}

historyClear() {
    this.historyTextElement.innerHTML = '';
    for (let i = 0; i < updateHistoryArr.length; i++) {
        updateHistoryArr[i] = ' ';
      }
}

memoryClear() {
    this.memoryDisplay = 'M';
    this.memoryValue = '';
    this.memoryDisplayTextElement.style.visibility = 'hidden';
}

memoryStore() {
    const current = parseFloat(this.currentOperand);
    if (isNaN(current)) return;
    if (this.currentOperand === '') return
    this.memoryDisplay = 'M';
    this.memoryValue = this.currentOperand;
    this.memoryDisplayTextElement.style.visibility = 'visible';
    console.log(this.memoryValue)
    console.log(typeof(this.memoryValue))
}

memoryRecall() {  
    this.appendNumber(this.memoryValue);
}

memoryAdd() {
    const current = parseFloat(this.currentOperand);
    if (isNaN(current)) return;
    if (this.currentOperand === '') return;
    this.memoryValue += eval(this.currentOperand);   
}

memorySubtract() {
    const current = parseFloat(this.currentOperand);
    if (isNaN(current)) return;
    if (this.currentOperand === '') return;
    this.memoryValue -= eval(this.currentOperand);
}

backspace() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
}

appendNumber(input) {
    if (input === '.' && this.currentOperand.includes('.')) return;
    if (this.computation != ''){
        this.currentOperand = '';
        this.computation = '';  
    }
    this.currentOperand = this.currentOperand.toString() + input.toString();
}

chooseOperation (operation) {
    if (this.currentOperand === '') return;
    this.operation = operation;
}

compute() {
    const current = parseFloat(this.currentOperand);
    if (isNaN(current)) return;
    if (!this.operation) return;
    this.computation = eval(this.currentOperand)
    this.history = this.currentOperand.toString() + " " + "=" + " " + this.computation.toString();
    this.operation = undefined;
    this.currentOperand = this.computation;     
}

updateDipslay() {
    if(this.currentOperand == ''){
        this.currentOperandTextElement.innerText = '0';
    } else  {
    this.currentOperandTextElement.innerText = this.currentOperand;
    }
}

updateMemoryDipslay() {  
    this.memoryDisplayTextElement.innerText = this.memoryDisplay;
}

updateHistory() {
    
    // top to bottom
    updateHistoryArr.unshift(this.history);
    updateHistoryArr.pop();
    // bottom to top
    //updateHistoryArr.shift();
    //updateHistoryArr.push(this.history);
    this.historyTextElement.innerHTML = updateHistoryArr.join("<br>"); 
}
}

const numberButtons = document.querySelectorAll('.number');
const operationButtons = document.querySelectorAll('.operator');
const equalsButton = document.getElementById('equal');
const backspaceButton = document.getElementById('backspace');
const allClearButton = document.getElementById('all-clear');
const memoryValue = '';
const currentOperandTextElement = document.getElementById('operationSpan');
const historyTextElement = document.getElementById('hd');
const updateHistoryArr = [' ', ' ', ' ', ' ', ' '];
const memoryDisplayTextElement = document.getElementById('memorySpan');
const memoryStoreButton = document.getElementById('memory-store');
const memoryClearButton = document.getElementById('memory-clear');
const memoryRecallButton = document.getElementById('memory-recall');
const memoryAddButton = document.getElementById('memory-add');
const memorySubtractButton = document.getElementById('memory-subtract');
const computation = '';

const calculator = new Calculator(currentOperandTextElement, historyTextElement, memoryDisplayTextElement, updateHistoryArr);

numberButtons.forEach(div => {
    div.addEventListener('click', () => {
        calculator.updateDipslay();
        calculator.appendNumber(div.innerText);
        calculator.updateDipslay();
    })
})

operationButtons.forEach(div => {
    div.addEventListener('click', () => {
        calculator.chooseOperation(div.innerText);
        calculator.appendNumber(div.innerText);
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
    calculator.updateHistory();
})

backspaceButton.addEventListener('click', div => {
    calculator.backspace();
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