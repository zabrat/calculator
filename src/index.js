const mainLineEl = document.querySelector('#mainLine');
const numbersButtonEl = document.querySelectorAll('button');
const staticDisplayEl = document.querySelector('.static-display');
let interactiveDisplay = '';

function fixInStaticDisplay () {
  const result = customEval(interactiveDisplay);
  const history = document.createElement('span');

  history.innerHTML = `${interactiveDisplay} = ${result}`;
  staticDisplayEl.appendChild(history);
  interactiveDisplay = '';
  showSymbol(result);
}

function checkDot(str) {
    const arr = str.trim().split(' ');
    const operators = ['+', '-', '÷', '×', '(', ')', '.'];
    if (operators.includes(arr[arr.length - 1]) || arr[arr.length - 1].includes('.')){
        ;
    } else {
        showSymbol('.');
    }
}
function addMinus (str) {
  if (str.length === 0) {
    showSymbol('-');
  } else if (
    ['+', '-', '÷', '×', '(', ')'].includes(
      str.trim()[str.trim().length - 1])
  ) {
    showSymbol('-');
  } else {
    showSymbol(' - ');
  }
}

function root () {
  const splitter = interactiveDisplay.split(' ');
  const rooted = Math.sqrt(splitter[splitter.length - 1]);

  splitter.splice(-1, 1);
  splitter.push(rooted);
  interactiveDisplay = splitter.join(' ');
  mainLineEl.innerHTML = interactiveDisplay;
}

function power () {
  const splitter = interactiveDisplay.split(' ');
  const powered = Math.pow(splitter[splitter.length - 1], 2);

  splitter.splice(-1, 1);
  splitter.push(powered);
  interactiveDisplay = splitter.join(' ');
  mainLineEl.innerHTML = interactiveDisplay;
}

function backspace () {
  if (interactiveDisplay[interactiveDisplay.length - 1] === ' ') {
    interactiveDisplay = interactiveDisplay.substring(
      0,
      interactiveDisplay.length - 3
    )
  } else {
    interactiveDisplay = interactiveDisplay.substring(
      0,
      interactiveDisplay.length - 1
    )
  }

  mainLineEl.innerHTML = interactiveDisplay;
}

function showSymbol (arg) {
  if (arg === 'C') {
    interactiveDisplay = '';
    staticDisplayEl.innerHTML = '';
  } else {
    interactiveDisplay += arg;
  }

  mainLineEl.innerHTML = interactiveDisplay;
}

function countInsideBraces (arr) {
  const start = arr.indexOf('(');
  const end = arr.lastIndexOf(')');
  const betweenBraces = arr.slice(start + 1, end);
  const res = customEval(betweenBraces.join(' '));
  const len = betweenBraces.length + 2;

  arr.splice(start, len, res);

  return arr;
}

function customEval (str) {
  const arr = str.split(' ');

  if (arr.includes('(') || arr.includes(')')) {
    countInsideBraces(arr);
    if (arr.length === 1) {
      return arr[0];
    }
  }

  if (arr.includes('×') || arr.includes('÷')) {
    MultiDivide(arr);
    if (arr.length === 1) {
      return arr[0];
    }
  }

  plusMinus(arr)
  if (arr.length === 1) {
    return arr[0];
  }
}

function MultiDivide (arr) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === '÷') {
      const res = Number(arr[i - 1]) / Number(arr[i + 1]);

      arr.splice(i - 1, 3, res);
      i -= 1;
    }

    if (arr[i] === '×') {
      const res = Number(arr[i - 1]) * Number(arr[i + 1]);
      arr.splice(i - 1, 3, res);
      i -= 1;
    }
  }

  return arr;
}

function plusMinus (arr) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === '+') {
      const res = Number(arr[i - 1]) + Number(arr[i + 1]);
      arr.splice(i - 1, 3, res);
      i -= 1;
    }
    if (arr[i] === '-') {
      const res = Number(arr[i - 1]) - Number(arr[i + 1]);
      arr.splice(i - 1, 3, res);
      i -= 1;
    }
  }
  return arr;
}

for (const i of numbersButtonEl) {
  i.addEventListener('click', () => {
    switch (i.id) {
      case 'one':
        showSymbol('1');
        break;
      case 'two':
        showSymbol('2');
        break;
      case 'three':
        showSymbol('3');
        break;
      case 'four':
        showSymbol('4');
        break;
      case 'five':
        showSymbol('5');
        break;
      case 'six':
        showSymbol('6');
        break;
      case 'seven':
        showSymbol('7');
        break;
      case 'eight':
        showSymbol('8');
        break;
      case 'nine':
        showSymbol('9');
        break;
      case 'zero':
        showSymbol('0');
        break;
      case 'doubleZero':
        showSymbol('00');
        break;
      case 'dot':
        checkDot(interactiveDisplay);
        break;
      case 'division':
        showSymbol(' ÷ ');
        break;
      case 'back':
        backspace();
        break;
      case 'clear':
        showSymbol('C');
        break;
      case 'multi':
        showSymbol(' × ');
        break;
      case 'frontBrace':
        showSymbol('( ');
        break;
      case 'backBrace':
        showSymbol(' )');
        break;
      case 'minus':
        addMinus(interactiveDisplay);
        break;
      case 'power':
        power();
        break;
      case 'root':
        root();
        break;
      case 'plus':
        showSymbol(' + ');
        break;
      case 'equally':
        fixInStaticDisplay();
        break;
    }
  });
}
