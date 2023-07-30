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


const clicks = document.querySelectorAll('button');
clicks.forEach(click => click.addEventListener('click', (e) => {
    const clickContent = e.target.textContent;
    if (clickContent >= '0' && clickContent <= '9') {
        const display = document.querySelector('div');
        display.textContent = e.target.textContent;
    }
}));
