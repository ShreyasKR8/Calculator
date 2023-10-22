let operandA = 0;
let operandB = 0;
let operatorCount = 0;
let operandCount = 0;
let pressedEquals = false;
let canPressDot = true;
let operator1 = "";
const operatorRegex = /[+*/%]/;
const buttons = document.querySelectorAll("button");
const numberButtons = document.querySelectorAll(".numbers");
const operatorButtons = document.querySelectorAll(".operator");
console.log(operatorButtons);
const moduloButton = document.querySelector(".modulus");
const divideButton = document.querySelector(".division");
const multiplyButton = document.querySelector(".product");
const subtractButton = document.querySelector(".subtraction");
const addButton = document.querySelector(".addition");
const equalsButton = document.querySelector(".equals");
const dotButton = document.querySelector(".dot");
const delButton = document.querySelector(".del");
const clearButton = document.querySelector(".clear");
const operatorArray = ["+", "-", "*", "/", "%"];

const displayScreen = document.querySelector(".calculator-display");
displayScreen.textContent = "";

function calculate(expression)
{
    if(expression.includes('+'))
    {
        return add(expression);
    }
    
    if(expression.includes('-'))
    {
        let operatorIndex = expression.indexOf('-');
        if(operatorIndex != 0)
        {
            operandA = expression.slice(0, operatorIndex);
            operandB = expression.slice(operatorIndex + 1, expression.length);
            return subtract(operandA, operandB);
        }
        // Negative number at the beginning of the expression
        operandA = parseFloat(expression);
        if(expression.slice(1).includes('-'))
        {
            operatorIndex = expression.lastIndexOf('-')
            operandB = expression.slice(operatorIndex + 1, expression.length);
            return subtract(operandA, operandB);
        }  
    }

    if(expression.includes('*'))
    {
        return multiply(expression);
    }

    if(expression.includes('/'))
    {
        return divide(expression);
    }

    if(expression.includes('%'))
    {
        return modulo(expression);
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

// buttons.forEach(button => {
//     button.addEventListener("click", (e) => {
//         if(displayScreen.textContent.length === 0 && /[+*/%]/.test(button.textContent))
//         {
//             return;
//         }
//         if(pressedEquals) // If user clicked equals in previous click, Clear screen for current calc
//         {
//             displayScreen.textContent = "";
//             pressedEquals = false;
//         }
//         if(isNaN(parseInt(e.target.innerHTML)))
//         {
//             operatorCount++;
//         }
//         else
//         {
//             operandCount++;
//         }
//         if(button.textContent === "DEL")
//         {
//             displayScreen.textContent = displayScreen.textContent.slice(0, -1);
//         }
//         else if(button.textContent === "AC")
//         {
//             displayScreen.textContent = "";
//         }
//         else if(button.textContent === "+/-")
//         {
//             displayScreen.textContent += "-";
//         }
//         else if(button.textContent !== "=" )
//         {
//             displayScreen.textContent += button.textContent;
//         }
        
//         // if(button.textContent === "=")
//         // {
//         //     displayScreen.textContent = calculate(displayScreen.textContent);
//         //     pressedEquals = true;
//         // }
//         // else if(operandCount > 1 && (operatorCount === 2 || operatorCount === 3)) //To evaluate 2 operands at a time
//         // {
//         //     let secOp = displayScreen.textContent.slice(-1); //store the last dangling operator the user entered
//         //     displayScreen.textContent = calculate(displayScreen.textContent.slice(0, -1)); //remove the last dangling operator from expression
//         //     displayScreen.textContent += secOp; //Add the dangling operator after evaluation
//         //     operandCount = 1;
//         //     operatorCount = 1;
//         // }
//     })
// });

function doCalculate(expression, calcOperator)
{
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
        default: console.log("none");
    }
}

numberButtons.forEach(numButton => {
    numButton.addEventListener("click", function(evt)  {
        const number = this.textContent;
        displayScreen.textContent += number;
        operandCount++;
    })
})

dotButton.addEventListener("click", function(evt)  {
    if(canPressDot) // Not allowing two dots in one number
    {
        const operator = this.textContent;
        displayScreen.textContent += operator;
        canPressDot = false; //cannot press dot until an it's a new number
    }
})

moduloButton.addEventListener("click", function(evt)  {
    operatorCount++;
    if(displayScreen.textContent.length === 0)
    {
        return;
    }
    const operator = this.textContent;
    displayScreen.textContent += operator;
    if(operatorCount === 2 && operandCount === 2) //try to call a seperate equals function or not maybe
    {
        let secOp = displayScreen.textContent.slice(-1); //store the last dangling operator the user entered
        doCalculate(displayScreen.textContent.slice(0, -1), operator1); //remove the last dangling operator from expression
        displayScreen.textContent += secOp; //Add the dangling operator after evaluation
        operandCount = 1;
        operatorCount = 1;
    }
    operator1 = "%";
    canPressDot = true; //can press dot after this as it will be a new number
})

divideButton.addEventListener("click", function(evt) {
    operatorCount++;
    if(displayScreen.textContent.length === 0)
    {
        return;
    }
    const operator = this.textContent;
    displayScreen.textContent += operator;
    if(operatorCount === 2 && operandCount === 2) //try to call a seperate equals function or not maybe
    {
        let secOp = displayScreen.textContent.slice(-1); //store the last dangling operator the user entered
        doCalculate(displayScreen.textContent.slice(0, -1), operator1); //remove the last dangling operator from expression
        displayScreen.textContent += secOp; //Add the dangling operator after evaluation
        operandCount = 1;
        operatorCount = 1;
    }
    operator1 = "/";
    canPressDot = true;
})

multiplyButton.addEventListener("click", function(evt) {
    operatorCount++;
    if(displayScreen.textContent.length === 0)
    {
        return;
    }
    canPressDot = true;
    const operator = this.textContent;
    displayScreen.textContent += operator;
    if(operatorCount === 2 && operandCount === 2) //try to call a seperate equals function or not maybe
    {
        let secOp = displayScreen.textContent.slice(-1); //store the last dangling operator the user entered
        doCalculate(displayScreen.textContent.slice(0, -1), operator1); //remove the last dangling operator from expression
        displayScreen.textContent += secOp; //Add the dangling operator after evaluation
        operandCount = 1;
        operatorCount = 1;
    }
    operator1 = "*";
})

subtractButton.addEventListener("click", function(evt) {
    operatorCount++;
    const operator = this.textContent;
    displayScreen.textContent += operator;
    canPressDot = true;
    if(operatorCount === 2 && operandCount === 2) //try to call a seperate equals function or not maybe
    {
        let secOp = displayScreen.textContent.slice(-1); //store the last dangling operator the user entered
        doCalculate(displayScreen.textContent.slice(0, -1), operator1); //remove the last dangling operator from expression
        displayScreen.textContent += secOp; //Add the dangling operator after evaluation
        operandCount = 1;
        operatorCount = 1;
    }
    operator1 = "-";
})

addButton.addEventListener("click", function(evt) {
    operatorCount++;
    if(displayScreen.textContent.length === 0)
    {
        return;
    }
    canPressDot = true;
    const operator = this.textContent;
    displayScreen.textContent += operator;
    if(operatorCount === 2 && operandCount === 2) //try to call a seperate equals function or not maybe
    {
        let secOp = displayScreen.textContent.slice(-1); //store the last dangling operator the user entered
        doCalculate(displayScreen.textContent.slice(0, -1), operator1); //remove the last dangling operator from expression
        displayScreen.textContent += secOp; //Add the dangling operator after evaluation
        operandCount = 1;
        operatorCount = 1;
    }
    operator1 = "+";
})

equalsButton.addEventListener("click", function(evt) {
    if(displayScreen.textContent.length === 0)
    {
        return;
    }
    canPressDot = true;
    let calcOperator = operator1;
    doCalculate(displayScreen.textContent, calcOperator);
})

delButton.addEventListener("click", function(evt) {
    if(!canPressDot && displayScreen.textContent.slice(-1) === ".") 
    {
        canPressDot = true; // if the deleted element is dot, set canPressDot to true
    }
    // if the deleted is an operator and canPressDot was set to true by any operator's event listeners then-there could be a better soln though
    if(canPressDot && operatorRegex.test(displayScreen.textContent.slice(-1))) 
    {
        console.log("yeah");    
        canPressDot = false; 
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
//handle calculating on chain calcs edit: almost but not yet