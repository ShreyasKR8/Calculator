
const expression = prompt("Enter expression to calculate: ");
let operandA = 0;
let operandB = 0;

console.log(expression);

function calculate()
{
    if(expression.includes('+'))
    {
        const operatorIndex = expression.lastIndexOf('+')
        operandA = parseInt(expression.slice(0, operatorIndex));
        operandB = parseInt(expression.slice(-(operatorIndex + 1)));
        add(operandA, operandB);
        return;
    }
    
    if(expression.includes('-'))
    {
        const operatorIndex = expression.indexOf('-');
        if(operatorIndex === 0)
        {
            operandA = parseInt(expression.slice(0, operatorIndex));
            operatorIndex = expression.lastIndexOf('-');
            operandB = parseInt(expression.slice(-(operatorIndex + 1)));
            subtract(operandA, operandB);
            return;
        }
        operatorIndex = expression.lastIndexOf('-');
        operandA = parseInt(expression.slice(0, operatorIndex));
        operandB = parseInt(expression.slice(-(operatorIndex + 1)));
        subtract(operandA, operandB);
        return;
    }

    if(expression.includes('*'))
    {
        const operatorIndex = expression.lastIndexOf('*')
        operandA = parseInt(expression.slice(0, operatorIndex));
        operandB = parseInt(expression.slice(-operatorIndex));
        multiply(operandA, operandB);
        return;
    }
    if(expression.includes('/'))
    {
        const operatorIndex = expression.lastIndexOf('/')
        operandA = parseInt(expression.slice(0, operatorIndex));
        operandB = parseInt(expression.slice(-operatorIndex));
        divide(operandA, operandB);
        return;
    }
} 

function add(operandA, operandB)
{
    console.log(operandA + operandB);
    console.log(operandA);
    console.log(operandB);
}

function subtract(operandA, operandB)
{
    console.log(operandA - operandB);
    console.log(operandA); 
    console.log(operandB);
}

function multiply(operandA, operandB)
{
    console.log(operandA * operandB);
}

function divide(operandA, operandB)
{
    console.log(operandA / operandB);
}
 
calculate();
