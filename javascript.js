function add(a, b) {
    return a + b;
}
function subtract(a, b) {
    return a - b;
}
function multipy(a, b) {
    return a * b;
}
function divide(a, b) {
    return a / b;
}

function operate(operator, a, b) {
    switch(operator) {
        case '+':  return add(a, b);
        case '-': return subtract(a, b);
        case '*': return multipy(a, b);
        case '/': return divide(a, b);

    }
}
//create 9 number buttons
for (let i = 0; i <= 9; i++) {
    numberButton = document.createElement('button');
    numberButton.textContent = i;
    numberButton.classList.add('number')
    document.body.appendChild(numberButton);
}

//dispay the clicks on the screen;
//according to the problem description, only want to display number

//need some variables to store previous click and previous calculation result
//use this click to add up the number
let preClickedNum = '';
const arr = [null, null];
//const opArr = [null, null];
const operators = ['+', '-', '*', '/', '='];
let currOperator = null;

const clicks = document.querySelectorAll('button');
clicks.forEach(click => click.addEventListener('click', (e) => {
    const clickContent = e.target.textContent;
    //display number on the screen
    const display = document.querySelector('div');
    if (clickContent >= '0' && clickContent <= '9') {
        
        display.textContent = preClickedNum + clickContent;
        preClickedNum = display.textContent;
    }
    //when hitting operator, need to add operator
    if (operators.includes(clickContent)) {
        let inputNum = parseInt(preClickedNum, 10)
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
            display.textContent = arr[0];
            currOperator = clickContent;
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
    
    //console.log(arr[0]);
    

}));
