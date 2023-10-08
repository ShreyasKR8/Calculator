let operandA = 0;
let operandB = 0;
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
        const operatorIndex = expression.indexOf('-');
        // if(operatorIndex === 0)
        // {
        //     operandA = -parseInt(expression.slice(0, operatorIndex));
        //     // operatorIndex = expression.lastIndexOf('-');
        //     operandB = parseInt(expression.slice(operatorIndex));
        //     // let result = subtract(operandA, operandB);
        //     // return
        // }
        // operatorIndex = expression.lastIndexOf('-');
        operandA = parseInt(expression.slice(0, operatorIndex));
        operandB = parseInt(expression.slice(-operatorIndex));
        // operandB = parseInt(expression.slice(-(operatorIndex + 1)));
        let result = subtract(operandA, operandB);
        return result;
        
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
    const operatorIndex = expression.lastIndexOf('+')
    operandA = parseInt(expression.slice(0, operatorIndex));
    operandB = parseInt(expression.slice(-(operatorIndex + 1)));
    return (operandA + operandB);
}

function subtract(operandA, operandB)
{
    return (operandA - operandB);
}

function multiply(expression)
{
    const operatorIndex = expression.lastIndexOf('*')
    operandA = parseInt(expression.slice(0, operatorIndex));
    operandB = parseInt(expression.slice(-operatorIndex));
    return (operandA * operandB);
}

function divide(expression)
{
    const operatorIndex = expression.lastIndexOf('/')
    operandA = parseInt(expression.slice(0, operatorIndex));
    operandB = parseInt(expression.slice(-operatorIndex));
    if(operandA === 0)
        return "0, I mean its alright"
    if(operandB === 0)
        return "dude seriously??";
    return (operandA / operandB);
}

function modulo(expression)
{
    const operatorIndex = expression.lastIndexOf('%')
    operandA = parseInt(expression.slice(0, operatorIndex));
    operandB = parseInt(expression.slice(-operatorIndex));
    if(operandB === 0)
        return "dude seriously??";
    return (operandA % operandB);
}

buttons.forEach(button => {
    button.addEventListener("click", (e) => {
        if(button.textContent === "DEL")
        {
            displayScreen.textContent = displayScreen.textContent.slice(0, -1);
        }
        else if(button.textContent === "AC")
            displayScreen.textContent = "";
        else if(button.textContent === "+/-")
            displayScreen.textContent += "-";
        else if(button.textContent !== "=")
            displayScreen.textContent += button.textContent;
        else if(button.textContent === "=")
        {
            displayScreen.textContent = calculate(displayScreen.textContent);
        }
    })
});