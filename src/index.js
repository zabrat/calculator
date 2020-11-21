const mainLineEl = document.querySelector('#mainLine');
const numbersButtonEl = document.querySelectorAll('button')
const staticDisplayEl = document.querySelector('.static-display')
var interactiveDisplay = '';

function fixInStaticDisplay(){
    const result = customEval(interactiveDisplay);
    const history = document.createElement('span');
    history.innerHTML = `${interactiveDisplay} = ${result}` ;
    staticDisplayEl.appendChild(history);
    interactiveDisplay = '';
    showSymbol(result);
}

function addMinus(){
    if (interactiveDisplay.length === 0) { 
        showSymbol("-");
    }else if (['+', '-', '/', 'x', '(', ')'].includes(interactiveDisplay.trim()[interactiveDisplay.trim().length - 1]))
     {
        showSymbol("-");
    }else
    {
        showSymbol(" - ");   
    }
}

function root(){
    let splitter = interactiveDisplay.split(' ');
    const rooted = Math.sqrt(splitter[splitter.length - 1]);
    splitter.splice(-1,1);
    splitter.push(rooted);
    interactiveDisplay = splitter.join(' ');
    mainLineEl.innerHTML = interactiveDisplay;
}

function power(){
    let splitter = interactiveDisplay.split(' ');
    const powered = Math.pow(splitter[splitter.length - 1], 2);
    splitter.splice(-1,1);
    splitter.push(powered);
    interactiveDisplay = splitter.join(' ');
    mainLineEl.innerHTML = interactiveDisplay;
}

function backspace(){
    if (interactiveDisplay[interactiveDisplay.length - 1] === ' '){
        interactiveDisplay = interactiveDisplay.substring(0, interactiveDisplay.length - 3);  
    } else {
        interactiveDisplay = interactiveDisplay.substring(0, interactiveDisplay.length - 1);  
    }
    mainLineEl.innerHTML = interactiveDisplay;
}

function showSymbol(arg){
    if (arg === 'C'){
        interactiveDisplay = '';
        staticDisplayEl.innerHTML = '';
    } else {
        interactiveDisplay += arg;
    }
    mainLineEl.innerHTML = interactiveDisplay;
}

function countInsideBraces(str){
    const start = str.indexOf('(');
    const end = str.lastIndexOf(')');
    const betweenBraces = str.slice(start + 1, end);
    let res = customEval(betweenBraces.join(' '));
    const len = betweenBraces.length + 2;
    console.log(res, 'this is res')
    console.log(str)
    str.splice(start, len, res);
    console.log(str);
    return str;
}

function customEval(str) {
  str = str.split(' ')
  
  if (str.includes('(') || str.includes(')')){
    countInsideBraces(str);
    if (str.length === 1){
    return str[0];
        }
    }

  if (str.includes('x') || str.includes('/')){
    MultiDivide(str);
    if (str.length === 1){
    return str[0];
    }
  }
  plusMinus(str);
  if (str.length === 1){
    return str[0];
    }
}

function MultiDivide(str) {
    
    for (var i = 0; i < str.length; i++){
        if (str[i] == '/') {
         const res = Number(str[i - 1]) / Number(str[i+1]);
          str.splice(i - 1, 3, res)
          i -= 1;
        }
        if (str[i] == 'x') {
         const res = Number(str[i-1]) * Number(str[i+1]);
          str.splice(i - 1, 3, res)
          i -= 1;
        }
    }
      return str;
}

function plusMinus(str){
  
    for (var i = 0; i < str.length; i++){
        if (str[i] == '+') {
         const res = Number(str[i-1]) + Number(str[i+1]);
          str.splice(i-1, 3, res)
          i-=1;
        }
        if (str[i] == '-') {
         const res = Number(str[i-1]) - Number(str[i+1]);
          str.splice(i-1, 3, res)
          i-=1;
        }
    } 
    return str;
  }

for(let i of numbersButtonEl){
    i.addEventListener('click', () => {
        switch (i.id) {
            case 'one':
                showSymbol("1");
                break;
            case 'two':
                showSymbol("2");
                break;
            case 'three':
                showSymbol("3");
                break;
            case 'four':
                showSymbol("4");
                break;
            case 'five':
                showSymbol("5");
                break;
            case 'six':
                showSymbol("6");
                break;
            case "seven":
                showSymbol("7");
                break;
            case 'eight':
                showSymbol("8");
                break;
            case "nine":
                showSymbol("9");
                break;
            case 'zero':
                showSymbol("0");
                break;
            case "doubleZero":
                showSymbol("00");
                break;
            case "dot":
                showSymbol(".");
                break;
            case 'division':
                showSymbol(" / ");
                break;
            case 'back':
                backspace();
                break;
            case 'clear':
                showSymbol("C");
                break;
            case 'multi':
                showSymbol(" x ");
                break;
            case 'frontBrace':
                showSymbol("( ");
                break;
            case 'backBrace':
                showSymbol(" )");
                break;
            case "minus":
                addMinus();
                break;
            case 'power':
                power();
                break;
            case "root":
                root();
                break;
            case 'plus':
                showSymbol(" + ");
                break;
            case "equally":
                fixInStaticDisplay();
                break;
            }
        }
    )
}
