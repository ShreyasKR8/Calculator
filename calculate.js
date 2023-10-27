let operandA = 0;
let operandB = 0;
let operatorCount = 0;
let operandCount = 0;
let pressedEquals = false;
let canPressDot = true;
let secondOperator = "";
// const operatorRegex = /[+*-/%]/;
const operatorRegex = /[+\-*\/%]/;
const buttons = document.querySelectorAll("button");
const numberButtons = document.querySelectorAll(".numbers");
const operatorButtons = document.querySelectorAll(".operator");
const moduloButton = document.querySelector(".modulus");
const divideButton = document.querySelector(".division");
const multiplyButton = document.querySelector(".product");
const subtractButton = document.querySelector(".subtraction");
const addButton = document.querySelector(".addition");
const equalsButton = document.querySelector(".equals");
const dotButton = document.querySelector(".dot");
const delButton = document.querySelector(".del");
const clearButton = document.querySelector(".clear");
const signButton = document.querySelector(".sign");
const displayScreen = document.querySelector(".calculator-display");
displayScreen.textContent = "";

function handleOperatorInput(operator) {
    operatorCount++;
    if(displayScreen.textContent.length === 0 || operatorRegex.test(displayScreen.textContent.slice(-1)))
    {
        return;
    }
    canPressDot = true;
    // const operator = this.textContent;
    displayScreen.textContent += operator;
    if(operatorCount === 2) //try to call a seperate equals function or not maybe
    {
        let secOp = displayScreen.textContent.slice(-1); //store the last dangling operator the user entered
        calculate(displayScreen.textContent.slice(0, -1), secondOperator); //remove the last dangling operator from expression
        displayScreen.textContent += secOp; //Add the dangling operator after evaluation
        operandCount = 1;
        operatorCount = 1;
    }
}

function add(expression)
{
    const operatorIndex = expression.indexOf('+')
    if(expression.includes("."))
    {
        operandA = parseFloat(expression.slice(0, operatorIndex));
        operandB = parseFloat(expression.slice(operatorIndex + 1, expression.length));
    }
    else
    {
        operandA = parseInt(expression.slice(0, operatorIndex));
        operandB = parseInt(expression.slice(operatorIndex + 1, expression.length));
    }
    return (operandA + operandB);
}

function subtract(expression)
{
    let operatorIndex = expression.indexOf('-');
        if(operatorIndex != 0)
        {
            operandA = expression.slice(0, operatorIndex);
            operandB = expression.slice(operatorIndex + 1, expression.length);
            return (operandA - operandB);
        }
        // Negative number at the beginning of the expression
        operandA = parseFloat(expression);
        if(expression.slice(1).includes('-'))
        {
            operatorIndex = expression.lastIndexOf('-')
            operandB = expression.slice(operatorIndex + 1, expression.length);
            return (operandA - operandB);
        } 
}

function multiply(expression)
{
    const operatorIndex = expression.indexOf('*')
    operandA = expression.slice(0, operatorIndex);
    operandB = expression.slice(operatorIndex + 1, expression.length);
    return (operandA * operandB);
}

function divide(expression)
{
    const operatorIndex = expression.indexOf('/')
    operandA = expression.slice(0, operatorIndex);
    operandB = expression.slice(operatorIndex+ 1, expression.length);
    if(operandA === "0")
        return "0, I mean its alright"
    if(operandB === "0")
    {
        return "dude seriously??";
        
    }
    return (operandA / operandB);
}

function modulo(expression)
{
    const operatorIndex = expression.indexOf('%')
    operandA = expression.slice(0, operatorIndex);
    operandB = expression.slice(operatorIndex + 1, expression.length);
    if(operandB === 0)
        return "dude seriously??";

    if ( operandA < 0 )
        operandA = operandB - Math.abs(operandA) % operandB;
    return operandA % operandB;
}

function calculate(expression, calcOperator)
{
    expression = (expression.replace(/\(/g, "")); //remove brackets from the expression, if any
    expression = expression.replace(/\)/g, "");
    switch(calcOperator)
    {
        case "+":displayScreen.textContent = add(expression);
            break;
        case "-" : displayScreen.textContent = subtract(expression);
            break; 
        case "*" : displayScreen.textContent = multiply(expression);
            break;
        case "/" : displayScreen.textContent = divide(expression);
            break;
        case "%" : displayScreen.textContent = modulo(expression);
            break;
            default: displayScreen.textContent = "Invalid";
        }
    }

numberButtons.forEach(numButton => {
    numButton.addEventListener("click", function(evt)  {
        const number = this.textContent;
        displayScreen.textContent += number;
        operandCount++;
    })
})

signButton.addEventListener("click", () => {
    displayScreen.textContent += "(-)";
})

dotButton.addEventListener("click", function(evt)  {
    if(canPressDot) // Not allowing two dots in one number
    {
        displayScreen.textContent += ".";
        canPressDot = false; //cannot press dot until an it's a new number
    }
})

moduloButton.addEventListener("click", (evt) =>  {
    handleOperatorInput(evt.target.textContent);
    secondOperator = "%";
})

divideButton.addEventListener("click", (evt) => {
    handleOperatorInput(evt.target.textContent);
    secondOperator = "/";
})

multiplyButton.addEventListener("click", (evt) => {
    handleOperatorInput(evt.target.textContent);
    secondOperator = "*";
})

subtractButton.addEventListener("click", (evt) => {
    handleOperatorInput(evt.target.textContent);
    secondOperator = "-";
})

addButton.addEventListener("click", (evt) => {
    handleOperatorInput(evt.target.textContent);
    secondOperator = "+";
})

equalsButton.addEventListener("click", () => {
    if(displayScreen.textContent.length === 0)
    {
        return;
    }
    canPressDot = true;
    let calcOperator = secondOperator;
    calculate(displayScreen.textContent, calcOperator);
    operandCount = 1;
    operatorCount = 0;
})

delButton.addEventListener("click", function(evt) {
    let deletedItem = displayScreen.textContent.slice(-1);
    if(!canPressDot && deletedItem === ".") 
    {
        canPressDot = true; // if the deleted element is dot, set canPressDot to true
    }
    console.log(deletedItem)
    console.log(canPressDot);
    console.log(operatorRegex);
    console.log(operatorRegex.test(deletedItem))
    // if the deleted is an operator and canPressDot was set to true by any operator's event listeners then-there could be a better soln though
    if(canPressDot && operatorRegex.test(deletedItem)) 
    {   
        canPressDot = false; 
    }
    if(operatorRegex.test(deletedItem))
    {
        operatorCount--;
    }
    displayScreen.textContent = displayScreen.textContent.slice(0, -1);
})

clearButton.addEventListener("click", function(evt) {
    displayScreen.textContent = "";
    canPressDot = true;
    operatorCount = 0;
    operandCount = 0;
})

//handle not allowing * / + % together
//rounding off problem
//keyboard support
//(-5)-(-5) = -10 hell nah fix it
//fix . not appearing after del dot