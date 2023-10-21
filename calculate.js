let operandA = 0;
let operandB = 0;
let operatorCount = 0;
let canPressDot = true;
let operator1 = "";
const buttons = document.querySelectorAll("button");
const numberButtons = document.querySelectorAll(".numbers");
const moduloButton = document.querySelector(".modulus");
const divideButton = document.querySelector(".division");
const multiplyButton = document.querySelector(".product");
const subtractButton = document.querySelector(".subtraction");
const addButton = document.querySelector(".addition");
const equalsButton = document.querySelector(".equals");
const dotButton = document.querySelector(".dot");
const delButton = document.querySelector(".del");
const clearButton = document.querySelector(".clear");

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

function subtract(operandA, operandB)
{
    
    return (operandA - operandB);
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


let operandCount = 0;
let pressedEquals = false;
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

function doCalculate(expression)
{
    switch(operator1)
    {
        case "+": displayScreen.textContent = add(expression);
        default: console.log("none");
    }
}

numberButtons.forEach(numButton => {
    numButton.addEventListener("click", function(evt)  {
        const number = this.textContent;
        displayScreen.textContent += number;
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
    const operator = this.textContent;
    displayScreen.textContent += operator;
    canPressDot = true; //can press dot after this as it will be a new number
})

divideButton.addEventListener("click", function(evt)  {
    const operator = this.textContent;
    displayScreen.textContent += operator;
    canPressDot = true;
})

multiplyButton.addEventListener("click", function(evt) {
    const operator = this.textContent;
    displayScreen.textContent += operator;
    canPressDot = true;
})

subtractButton.addEventListener("click", function(evt) {
    const operator = this.textContent;
    displayScreen.textContent += operator;
    canPressDot = true;
})

addButton.addEventListener("click", function(evt) {
    canPressDot = true;
    const operator = this.textContent;
    displayScreen.textContent += operator;
    operator1 += "+";
})

equalsButton.addEventListener("click", function(evt) {
    // const operator = this.textContent;
    // displayScreen.textContent += operator;
    canPressDot = true;
    doCalculate(displayScreen.textContent);
})

delButton.addEventListener("click", function(evt) {
    if(!canPressDot && displayScreen.textContent.slice(-1) === ".") 
    {
        canPressDot = true; // if the deleted element is dot, set canPressDot to true
    }
    displayScreen.textContent = displayScreen.textContent.slice(0, -1);
})

clearButton.addEventListener("click", function(evt) {
    displayScreen.textContent = "";
    canPressDot = true;
})

//handle * / + % together
//handle dot after operator deletion
//add done, do others