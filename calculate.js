let operandA = 0;
let operandB = 0;
let operatorCount = 0;
let operandCount = 0;
let canPressDot = true;
let previousOperator = "";
const operatorRegex = /[+\-*\/%]/; /* pro tip -> /[+-*\/%]/, - is interpreted 
as a range from + to *, so use \ esc sequence to say minus. */
const numberButtons = document.querySelectorAll(".numbers");
const operatorButtons = document.querySelectorAll(".operator");
const equalsButton = document.querySelector(".equals");
const dotButton = document.querySelector(".dot");
const delButton = document.querySelector(".del");
const clearButton = document.querySelector(".clear");
const signButton = document.querySelector(".sign");
const displayScreen = document.querySelector(".calculator-display");
displayScreen.textContent = "";

function addTransition(event)
{
    let button = document.querySelector(`button[data-key="${event.key}"]`);
    if(!button) 
    {
        return;
    }
    button.classList.add("active");
}

function removeTransition(event)
{
    const button = document.querySelector(`button[data-key="${event.key}"]`);
    if(!button)
    { 
        return;
    }
    button.classList.remove("active");
}

function playSound()
{
    const audio = document.querySelector("audio");
    if(!audio)
    {
        return;
    }
    audio.currentTime = 0;
    audio.play();
}

function handleNumberInput(number) {
    displayScreen.textContent += number;
    operandCount++;
}

function handleDotInput() {
    if (canPressDot) // Not allowing two dots in one number
    {
        displayScreen.textContent += ".";
        canPressDot = false;
    }
}

function handleSignsInput() {
    displayScreen.textContent += "(-)";
    //previousOperator = "-"; /*for cases like 5(-)6 which isnt how +/- button is 
    //supposed to be used but gotta make it user-friendly yk (idiot friendly haha) */
}

function handleOperatorInput(operator) {
    if(displayScreen.textContent.length === 0 || operatorRegex.test(displayScreen.textContent.slice(-1)))
    {
        return;
    }
    operatorCount++;
    canPressDot = true;
    displayScreen.textContent += operator;
    if(operatorCount === 2) //try to call a seperate equals function or not maybe
    {
        //store the last dangling operator the user entered
        let secondOperator = displayScreen.textContent.slice(-1);
        calculate(displayScreen.textContent.slice(0, -1), previousOperator); /*slice to remove the second 
        operator from chain expression */
        displayScreen.textContent += secondOperator; //Add the dangling operator after evaluation
        operandCount = 1;
        operatorCount = 1;
    }
    previousOperator = operator; //set current operator as prev to use it for chain expression like 6+6*
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
    operatorIndex = expression.lastIndexOf('-')
    operandA = expression.slice(0, operatorIndex);
    operandB = expression.slice(operatorIndex + 1, expression.length);
    if(operandA.slice(-1) === "-") //in the case of (-)x-(-)y, operandA will be -x- so
        operandA = operandA.slice(0, -1);
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
    if(operandB === "0")
    {
        return "dude seriously??";   
    }
    let result = operandA / operandB;
    if(result % 1 !== 0) // checks if a number has decimal places
        return result.toFixed(3);
    return result;
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
        case "/" : displayScreen.textContent = divide(expression)
            break;
        case "%" : displayScreen.textContent = modulo(expression);
            break;
        default: displayScreen.textContent = "Invalid";
    }
}

function handleEquals() {
    if(displayScreen.textContent.length === 0  || operandCount === 1)
    {
        return;
    }
    canPressDot = true;
    let calcOperator = previousOperator;
    calculate(displayScreen.textContent, calcOperator);
    operandCount = 1;   
    operatorCount = 0;
    operandA = 0;
    operandB = 0;
}

function handleDelete() {
    let deletedItem = displayScreen.textContent.slice(-1);
    if (deletedItem === ".") {
        canPressDot = true; // if the deleted element is dot, set canPressDot to true
    }
    /* if the deleted is an operator and canPressDot was set to true by any operator's
    event listeners then- (there could be a better soln though) */
    if (canPressDot && operatorRegex.test(deletedItem)) {
        canPressDot = false;
    }
    if (operatorRegex.test(deletedItem)) {
        operatorCount--;
        previousOperator = "";
    }
    displayScreen.textContent = displayScreen.textContent.slice(0, -1);
}

function handleClear() {
    displayScreen.textContent = "";
    canPressDot = true;
    operatorCount = 0;
    operandCount = 0;
    operandA = 0;
    operandB = 0;
    previousOperator = "";
}

function handleKeyboardInputs(event) {
    if (event.key === "Enter") { 
        handleEquals(); 
    }
    else if (/^[0-9]$/.test(event.key)) {
        handleNumberInput(event.key) ;
    }
    else if (event.key === "_") {
        handleSignsInput();
    }
    else if (operatorRegex.test(event.key)) {
        handleOperatorInput(event.key);
    }
    else if (event.key === ".") {
        handleDotInput();
    }
    else if (event.key === "Backspace") {
        handleDelete();
    }
    else if (event.key === "Delete") {
        handleClear() ;
    }
    event.preventDefault();
}

numberButtons.forEach(numButton => {
    numButton.addEventListener("click", (evt) => {
        handleNumberInput(evt.target.textContent);
        playSound();
    })
})

signButton.addEventListener("click", () => {
    handleSignsInput();
    playSound();
})

dotButton.addEventListener("click", () => {
    handleDotInput()
    playSound();
})

operatorButtons.forEach(opButton => {
    opButton.addEventListener("click", (evt) => {
        handleOperatorInput(evt.target.textContent);
        playSound();
    })
})

equalsButton.addEventListener("click", () => {
    handleEquals();
    playSound();
})

delButton.addEventListener("click", () => {
    handleDelete();
    playSound();
})

clearButton.addEventListener("click", () => {
    handleClear();
    playSound();
})

window.addEventListener('keydown', (event) => {
    handleKeyboardInputs(event);
    addTransition(event);
    const button = document.querySelector(`button[data-key="${event.key}"]`);

    if (button) { //Doesn't play sound if the key is a letter or irrelevant to calculator
        playSound();
    }
})

window.addEventListener('keyup', (event) => {
    removeTransition(event);
})