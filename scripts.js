const nmbrBtns = document.querySelectorAll('[data-number]');
const optBtns = document.querySelectorAll('[data-operador');
const eqBtn = document.querySelector('[data-equals');
const delBtn = document.querySelector('[data-delete');
const currentTxtElement = document.querySelector('[data-current-operand');
const previousTxtElement = document.querySelector('[data-previous-operand');
const allClearBtn = document.querySelector('[data-all-clear');

class Calculator {
    constructor(currentTxtElement, previousTxtElement){
        this.previousTxtElement = previousTxtElement;
        this.currentTxtElement = currentTxtElement;
        this.clear()
    }

    formatDisplayNumber(number) {
        const stringNum = number.toString();

        const interDigits = parseFloat(stringNum.split('.')[0]);
        const decimalDigits = stringNum.split('.')[1];

        let interDisplay;

        if (isNaN(interDigits)) {
            interDisplay = "";
        } else {
            interDisplay = interDigits.toLocaleString("en", {
                maximumFractionDigits:0,
            })
        }
        
        if (decimalDigits != null) {
            return `${interDisplay}.${decimalDigits}`;
        } else {
            return interDisplay;
        }
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0,-1);
    }

    calculate() {
        let result;

        const _previousOperand = parseFloat(this.previousOperand);
        const _currentOperand = parseFloat(this.currentOperand);

        if (isNaN(_previousOperand) || isNaN(_currentOperand))return;

        switch (this.operation) {
            case "+":
            result = _previousOperand + _currentOperand;
            break;
            case "-":
            result = _previousOperand - _currentOperand;
            break;
            case "/":
            result = _previousOperand / _currentOperand;
            break;
            case "*":
            result = _previousOperand * _currentOperand;
            break;
            default:
                return;
        }
        this.currentOperand = result;
        this.operation = undefined;
        this.previousOperand = "";
    }

    chooseOperation(operation) {
        if (this.currentOperand === "")return;
        if (this.previousOperand !== "") {
            this.calculate()
        }

        this.operation = operation;

        this.previousOperand = this.currentOperand;
        this.currentOperand = ""
    }

    appendNumber(number) {
        if (this.currentOperand.includes(".") && number === ".")return;

        this.currentOperand = `${this.currentOperand}${number.toString()}`;
    }
    
    clear () {
    this.currentOperand = "";
    this.previousOperand = "";
    this.operation = undefined;
    }

    updateDisplay(){
        this.previousTxtElement.innerText = `${this.formatDisplayNumber(this.previousOperand)} ${this.operation || ""}`;
        this.currentTxtElement.innerText = this.formatDisplayNumber(this.currentOperand);
    }
}

const calculator = new Calculator (
    previousTxtElement, 
    currentTxtElement
);

for (const nmbrBtn of nmbrBtns) {
    nmbrBtn.addEventListener("click" , () => {
        calculator.appendNumber(nmbrBtn.innerText)
        calculator.updateDisplay();
    });
}

for(const optBtn of optBtns) {
    optBtn.addEventListener("click" , () => {
        calculator.chooseOperation(optBtn.innerText)
        calculator.updateDisplay();
    });
}

allClearBtn.addEventListener("click", () => {
    calculator.clear();
    calculator.updateDisplay();
});

eqBtn.addEventListener("click", () => {
    calculator.calculate();
    calculator.updateDisplay();
})

delBtn.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
})