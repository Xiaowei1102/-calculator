function add(a, b) {
    res = a + b;
    return Number.isInteger(res) ? res : parseFloat(res.toFixed(6));
}
function subtract(a, b) {
    res = a - b;
    return Number.isInteger(res) ? res : parseFloat(res.toFixed(6));
}
function multipy(a, b) {
    res = a * b;
    return Number.isInteger(res) ? res : parseFloat(res.toFixed(6));
}
function divide(a, b) {
    if (b === 0) return 'HONEY Nonono'
    const res = a / b;
    return Number.isInteger(res) ? res : parseFloat(res.toFixed(6));
}

function operate(operator, a, b) {
    switch(operator) {
        case '+':  return add(a, b);
        case '-': return subtract(a, b);
        case '*': return multipy(a, b);
        case '/': return divide(a, b);

    }
}
// //create 9 number buttons: had to disable this for css purpose
// for (let i = 0; i <= 9; i++) {
//     numberButton = document.createElement('button');
//     numberButton.textContent = i;
//     numberButton.classList.add('number')
//     document.body.appendChild(numberButton);
// }

//consolidate all events in clickevents into a funciton to be called during key events for key support
function calculate(display, clickContent) {
        //check both numbers and operator are in place if '=' is the operator
        if (clickContent === '=' && (arr[1] === null || currOperator === null)) {
            display.textContent = 'Not Again Hon';
        }
        //display number on the screen
        
        if ((clickContent >= '0' && clickContent <= '9') || clickContent === '.') {
            //deal with decimal number case
            if (clickContent === '.') {
                document.getElementsByClassName('decimal-point').item(0).disabled = true;
                decimalDisabled = 'Yes';
            }
            
            display.textContent = preClickedNum + clickContent;
            preClickedNum = display.textContent;
        }
        //when hitting operator, need to add operator
        if (operators.includes(clickContent)) {
            //enable the demical button if it is disabled
            if (decimalDisabled === 'Yes') {
                document.getElementsByClassName('decimal-point').item(0).disabled = false;
                decimalDisabled = 'No';
            }
            //get the number which can be either integer or float
            let inputNum;
            if (preClickedNum.includes('.')) {
                inputNum = parseFloat(preClickedNum, 10);
            } else {
                inputNum = parseInt(preClickedNum, 10);
            }
            
            //first number should come from either first time entry
            //or from calculation
            if (arr[0] === null) { //initialize the first number
                arr[0] = inputNum;
            } else {//otherwise, this entered number must be second number
                arr[1] = inputNum;
            }
            
            //if this is the first time we enter operator, store in for later use
            if (currOperator === null) {
                currOperator = clickContent;
            } else {//if this is a second operator, we need calculate
                arr[0] = operate(currOperator, arr[0], arr[1]);
                arr[1] = null;
                display.textContent = arr[0];
      
    
                //need to deal with '=' special case, reset currOperator
                currOperator = clickContent === '=' ? null : clickContent;
                
                
            }
            //reset the number adding click
            preClickedNum = '';
        }
        //reset eveything if clear is clicked
        if (clickContent === 'clear') {
            arr.fill(null);
            currOperator = null;
            preClickedNum ='';
            display.textContent = 0;
        }
        //add backspace button to correct if wrong number or decimal point was entered previously
        if (clickContent === 'backspace') {
            if (preClickedNum !== '') {
                preClickedNum = preClickedNum.slice(0, preClickedNum.length - 1);   
            }
            display.textContent = preClickedNum == '' ? 0 : preClickedNum;
        }
}

//dispay the clicks on the screen;
//according to the problem description, only want to display number

//need some variables to store previous click and previous calculation result
//use this click to add up the number
let preClickedNum = '';
const arr = [null, null];
//const opArr = [null, null];
const operators = ['+', '-', '*', '/', '='];
let decimalDisabled = 'No';
let currOperator = null;

const clicks = document.querySelectorAll('button');
clicks.forEach(click => click.addEventListener('click', (e) => {
    const display = document.querySelector('div');
    const clickContent = e.target.textContent;
    calculate(display, clickContent);

}));



//add keyboard support: using key event

document.addEventListener('keydown', (e) => {
    const display = document.querySelector('div');
    const clickContent = e.key;
    console.log(clickContent);
    calculate(display, clickContent);
})