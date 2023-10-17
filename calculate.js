let operandA = 0;
let operandB = 0;
let operatorCount = 0;
const buttons = document.querySelectorAll("button");
const displayScreen = document.querySelector(".calculator-display");

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
buttons.forEach(button => {
    button.addEventListener("click", (e) => {
        if(pressedEquals) // If user clicked equals in previous click, Clear screen for current calc
        {
            displayScreen.textContent = "";
            pressedEquals = false;
        }
        if(isNaN(parseInt(e.target.innerHTML)))
        {
            operatorCount++;
        }
        else
        {
            operandCount++;
        }
        if(button.textContent === "DEL")
        {
            displayScreen.textContent = displayScreen.textContent.slice(0, -1);
        }
        else if(button.textContent === "AC")
        {
            displayScreen.textContent = "";
        }
        else if(button.textContent === "+/-")
        {
            displayScreen.textContent += "-";
        }
        else if(button.textContent !== "=" )
        {
            displayScreen.textContent += button.textContent;
        }
        
        if(button.textContent === "=")
        {
            displayScreen.textContent = calculate(displayScreen.textContent);
            pressedEquals = true;
        }
        else if(operandCount === 2 && (operatorCount === 2 || operatorCount === 3)) //To evaluate 2 operands at a time
        {
            let secOp = displayScreen.textContent.slice(-1); //store the last dangling operator the user entered
            displayScreen.textContent = calculate(displayScreen.textContent.slice(0, -1)); //remove the last dangling operator from expression
            displayScreen.textContent += secOp; //Add the dangling operator after evaluation
            operandCount = 1;
            operatorCount = 1;
        }
    })
});

// = not working and ac and DEL not working
//handle * / + shouldnt be allowed to print first