class Calculator {
    constructor(previousOperand, currentOperandTextElement, historyTextElement, updateHistoryArr) {
        this.previousOperand = previousOperand;
        this.currentOperandTextElement = currentOperandTextElement;
        this.historyTextElement = historyTextElement;
        this.memoryDisplayTextElement = memoryDisplayTextElement;
        this.updateHistoryArr = updateHistoryArr;
        this.clear();
        this.memoryClear();
    }

clear() {
    this.previousOperand = '';
    this.currentOperand = '';
    this.operation = undefined;

}

memoryClear() {
    this.memoryDisplay = 'M';
    this.memoryValue = '';
    this.memoryDisplayTextElement.style.visibility = 'hidden';
}

memoryStore() {
    if (this.currentOperand === '') return
    this.memoryDisplay = 'M';
    this.memoryValue = this.currentOperand;
    this.memoryDisplayTextElement.style.visibility = 'visible';

}

memoryRecall() {  
    this.currentOperand = this.memoryValue;
}

memoryAdd() {
    if (this.currentOperand === '') return
    parseFloat(this.memoryValue) += parseFloat(this.currentOperand);
}

memorySubtract() {
    if (this.currentOperand === '') return
    parseFloat(this.memoryValue) -= parseFloat(this.currentOperand);
}

backspace() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
}

appendNumber(number) {
    if (number === '.' && this.currentOperand.includes('.')) return;
    if (this.currentOperand !== '') {
        this.currentOperand = '';
    }
    this.currentOperand = this.currentOperand.toString() + number.toString();
}

chooseOperation (operation) {
    if (this.currentOperand === '') return;
    if (this.previousOperand !== '') {
        this.compute();
        this.updateHistory();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = '';
}

compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
        case '+': computation = prev + current
        break;
        case '-': computation = prev - current
        break;
        case '*': computation = prev * current
        break;
        case '/': computation = prev / current
        break;
        default: return;
    }
    this.history = prev.toString() + " " + this.operation.toString() + " " + current.toString() + " " + "=" + " " + computation.toString();
        //alert(this.history)
        //this.previousOperand = computation
    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = '';
        
}

updateDipslay() {
    if(this.operation != null && this.currentOperand === '') {
        this.currentOperandTextElement.innerText = this.operation;
    }  else {
        this.currentOperandTextElement.innerText = this.currentOperand;
    }
}

updateMemoryDipslay() {  
    this.memoryDisplayTextElement.innerText = this.memoryDisplay;
}

updateHistory() {
    console.log(this.history)
    if (this.updateHistoryArr[0] == 0) {
        this.updateHistoryArr[0] = this.history;
      } console.log(this.updateHistoryArr[0]);
       /*else if (this.updateHistoryArr[1] === '') {
        this.updateHistoryArr[1] = this.history;
      } else if (this.updateHistoryArr[2] === '') {
        this.updateHistoryArr[2] = this.history;
      } else if (this.updateHistoryArr[3] === '') {
        this.updateHistoryArr[3] = this.history;
      } else if (this.updateHistoryArr[4] === '') {
        this.updateHistoryArr[4] = this.history;
      } else { 
        //this.updateHistoryArr.shift();
        //this.updateHistoryArr.push(this.history);
        for (let i = 0; i < this.updateHistoryArr.length; i++) {
            text1 += this.updateHistoryArr[i] + "<br>";
            console.log(text1);
          }
    }
    console.log(this.updateHistoryArr[0]);
    for (let i = 0; i < this.updateHistoryArr.length; i++) {
        this.historyTextElement[i].innerText = this.updateHistoryArr[i];
      }*/
    
}
}

const numberButtons = document.querySelectorAll('.number');
const operationButtons = document.querySelectorAll('.operator');
const equalsButton = document.getElementById('equal');
const backspaceButton = document.getElementById('backspace');
const allClearButton = document.getElementById('all-clear');
const previousOperand = '';
const memoryValue = '';
const currentOperandTextElement = document.getElementById('operationSpan');
const historyTextElement = [
    document.getElementById('hd1'),
    document.getElementById('hd2'),
    document.getElementById('hd3'),
    document.getElementById('hd4'),
    document.getElementById('hd5')
];
const updateHistoryArr = ['0', '0', '0', '0', '0'];
const memoryDisplayTextElement = document.getElementById('memorySpan');
const memoryStoreButton = document.getElementById('memory-store');
const memoryClearButton = document.getElementById('memory-clear');
const memoryRecallButton = document.getElementById('memory-recall');
const memoryAddButton = document.getElementById('memory-add');
const memorySubtractButton = document.getElementById('memory-subtract');




const calculator = new Calculator(previousOperand, currentOperandTextElement, historyTextElement, memoryDisplayTextElement, updateHistoryArr);

numberButtons.forEach(div => {
    div.addEventListener('click', () => {
        calculator.appendNumber(div.innerText);
        calculator.updateDipslay();
    })

})

operationButtons.forEach(div => {
    div.addEventListener('click', () => {
        calculator.chooseOperation(div.innerText);
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
