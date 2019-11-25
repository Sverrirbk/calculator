var value1 = ""; // stores the first value
var value2 = ""; // stores the currently inputed value
var currentEquation = ""; // stores the current string of numbers and operators
var operator = ""; // stores the operator
var operatorToggle = false;
var lastOperator = ""; // stores the last operator picked
var value1Toggle = false; // tells us if the first number has been chosen
var value2Toggle = false; // tells us if the second number has been chosen

// when a number is pressed. The first number in an equations is always value1
function numberPress(){
    if (value1Toggle == false) {
        value1 += document.getElementById(event.target.id).innerText;
        mainDisplay2.innerHTML = value1;
    }
    else if (value2Toggle == false) {
        value2 += document.getElementById(event.target.id).innerText;
        mainDisplay2.innerHTML = value2; 
    }
    else {
        value2 += document.getElementById(event.target.id).innerText;
        mainDisplay2.innerHTML = value2; 
    }
    console.log("this is value1 " + value1);
    console.log("this is value2 " + value2);
    console.log("value1toggle is " + value1Toggle);
    console.log("value2toggle is " + value2Toggle);
}


function operatorPress(){
    lastOperator = operator; 
    // stores the operator that is to be used for the current operation
    operator = document.getElementById(event.target.id).innerText; // this operator will not be used now unless equals is pressed
    
    if (value1Toggle == false) { // if it is the first operator pressed
       currentEquation += " " + value1 + " " + operator;
       mainDisplay1.innerHTML = value1 + " " + operator;
       value1Toggle = true;
    }
    else {
        // if value1 is stored
        displayCurrentEquation(value2);
        checkOperator();
        var lastChar = currentEquation.charAt(currentEquation.length -2); // tracks if last letter is operator
        if (lastChar == "+" || lastChar == "-" || lastChar == "*" || lastChar == "/") {
            // replaces the operator if a new one is chosen
            currentEquation = currentEquation.slice(0, -2) + operator;
            mainDisplay1.innerHTML = currentEquation;
        }
        else if (value1Toggle == true && value2Toggle == false) { 
            // if it is the first time value2 is used
            value2Toggle = true;
        }
        else if (value2Toggle == false) { 
            // if equals has been pressed
            runOperator(lastOperator); 
            value2Toggle = true;
            
        }
        else if (value2Toggle == true) { 
            // every subsequent operation
            runOperator(lastOperator); 
        }
        value2 = "";
        displayCurrentEquation(operator);
        displayTotal()
    }
    
    
    console.log("this is value1 " + value1);
    console.log("this is value2 " + value2);
    console.log("value1toggle is " + value1Toggle);
    console.log("value2toggle is " + value2Toggle);
}

// displayes the current equation, if value2 isn't selected it only displayes the total
function displayCurrentEquation(string) {
        currentEquation += " " + string;
        mainDisplay1.innerHTML = currentEquation;
}

// displays the current total on the main screen
function displayTotal() {
    mainDisplay2.innerHTML = value1;
}
// gives final results
function equalsPress(){ 
    displayCurrentEquation(value2);
    if (value2 == "") {
        value2 = value1;
        displayCurrentEquation(operator);
        displayCurrentEquation(value2);
    }
    runOperator(operator); 
    displayTotal()
    value2 = "";
    value2Toggle = false;
}

// excecutes the chosen operator
function runOperator(string) {
    value1 = parseFloat(value1);
    value2 = parseFloat(value2);
    switch(string) {
        case "+":
            value1 = sum(value1, value2);
        break;
        case "-":
            value1 = subtract(value1, value2);
        break;
        case "*":
            value1 = multiply(value1, value2);
        break;
        case "/":
            value1 = divide(value1, value2);
        break;
    }
}

// clears the memory and screen
function clearPress(){
    clearMemory();
    clearScreen();
}

// clears memory
function clearMemory(){
    value1 = "";
    value2 = "";
    operator = "";
    currentEquation = "";
    value1Toggle = false;
    value2Toggle = false;
}

// clears screen
function clearScreen(){
    mainDisplay1.innerHTML = "";
    mainDisplay2.innerHtml = "";
    secondaryDisplay.innerHTML = "";
}

// math functions
const sum = (...args) => [...args].reduce((a, b) => a + b, 0);
console.log(sum(4, 5))

const subtract = (...args) => [...args].reduce((a, b) => (-a) - (b), 0);
console.log(subtract(4, 5))

const multiply = (...args) => [...args].reduce((a, b) => a * b);
console.log(multiply(4, 5))

const divide = (...args) => [...args].reduce((a, b) => a / b);
console.log(divide(4, 5));