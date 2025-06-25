const display = document.getElementById('display');
let memory = 0;
let angleMode = 'DEG'; // Can be "DEG" or "RAD"
let secondMode = false;

// === Attach Events to All Buttons ===
document.querySelectorAll('.btn').forEach(button => {
  button.addEventListener('click', () => {
    const func = button.getAttribute('data-func');
    handleInput(func);
  });
});

// === Utility Functions ===
const roundResult = (num, precision = 10) => parseFloat(num.toFixed(precision));
const degToRad = deg => deg * (Math.PI / 180);
const radToDeg = rad => rad * (180 / Math.PI);

function factorial(n) {
  if (n < 0) return 'Error';
  return n === 0 ? 1 : n * factorial(n - 1);
}

function insertAtEnd(text) {
  display.value += text;
  display.focus();
  display.setSelectionRange(display.value.length, display.value.length);
}

function toggleSecondFunctions() {
  const map = secondMode
    ? {
        'x²': '√', 'x³': '∛', 'x^y': 'ʸ√x', 'x!': '|x|',
        'sin': 'sin⁻¹', 'cos': 'cos⁻¹', 'tan': 'tan⁻¹',
        'sinh': 'sinh⁻¹', 'cosh': 'cosh⁻¹', 'tanh': 'tanh⁻¹'
      }
    : {
        '√': 'x²', '∛': 'x³', 'ʸ√x': 'x^y', '|x|': 'x!',
        'sin⁻¹': 'sin', 'cos⁻¹': 'cos', 'tan⁻¹': 'tan',
        'sinh⁻¹': 'sinh', 'cosh⁻¹': 'cosh', 'tanh⁻¹': 'tanh'
      };

  document.querySelectorAll('.btn').forEach(btn => {
    const text = btn.textContent;
    if (map[text]) {
      btn.textContent = map[text];
      btn.setAttribute('data-func', map[text]);
    }
  });

  document.getElementById('second-toggle')?.classList.toggle('active', secondMode);
}

// === Main Input Handler ===
function handleInput(func) {
  let value = display.value;
  const parse = v => parseFloat(eval(v));

  try {
    switch (func) {
      case '⇆':
        secondMode = !secondMode;
        toggleSecondFunctions();
        break;

      case 'C':
        display.value = '0';
        break;

      case '=':
        const evaluated = value
          .replace(/π/g, Math.PI)
          .replace(/e/g, Math.E)
          .replace(/\^/g, '**')
          .replace(/÷/g, '/')
          .replace(/×/g, '*');
        display.value = eval(evaluated);
        break;

      case '+/-':
        display.value = -parse(value);
        break;

      case '%':
        display.value = parse(value) / 100;
        break;

      case '2ˣ':
        const x = parseFloat(value);
        display.value = isNaN(x) ? 'Error' : Math.pow(2, x);
        break;

      case '|x|':
        display.value = Math.abs(parse(value));
        break;

      case 'x²':
        display.value = parse(value) ** 2;
        break;

      case 'x³':
        display.value = parse(value) ** 3;
        break;

      case 'x^y':
        display.value += '**';
        break;

      case '^1/y':
        display.value += '**(1/';
        break;

      case '√':
        display.value = Math.sqrt(parse(value));
        break;

      case '∛':
        display.value = Math.cbrt(parse(value));
        break;

      case 'ln':
        display.value = Math.log(parse(value));
        break;

      case 'log':
        display.value = Math.log10(parse(value));
        break;

      case 'exp':
        display.value = Math.exp(parse(value));
        break;

      case '10^x':
        display.value = 10 ** parse(value);
        break;

      case 'sin':
        display.value = roundResult(Math.sin(angleMode === 'DEG' ? degToRad(parse(value)) : parse(value)));
        break;

      case 'cos':
        display.value = roundResult(Math.cos(angleMode === 'DEG' ? degToRad(parse(value)) : parse(value)));
        break;

      case 'tan':
        display.value = roundResult(Math.tan(angleMode === 'DEG' ? degToRad(parse(value)) : parse(value)));
        break;

      case 'sin⁻¹':
        display.value = roundResult(angleMode === 'DEG'
          ? radToDeg(Math.asin(parse(value)))
          : Math.asin(parse(value)));
        break;

      case 'cos⁻¹':
        display.value = roundResult(angleMode === 'DEG'
          ? radToDeg(Math.acos(parse(value)))
          : Math.acos(parse(value)));
        break;

      case 'tan⁻¹':
        display.value = roundResult(angleMode === 'DEG'
          ? radToDeg(Math.atan(parse(value)))
          : Math.atan(parse(value)));
        break;

      case 'sinh':
        display.value = Math.sinh(parse(value));
        break;

      case 'cosh':
        display.value = Math.cosh(parse(value));
        break;

      case 'tanh':
        display.value = Math.tanh(parse(value));
        break;

      case 'sinh⁻¹':
        display.value = Math.asinh(parse(value));
        break;

      case 'cosh⁻¹':
        display.value = Math.acosh(parse(value));
        break;

      case 'tanh⁻¹':
        display.value = Math.atanh(parse(value));
        break;

      case 'π':
        display.value += Math.PI;
        break;

      case 'e':
        display.value += Math.E;
        break;

      case 'x!':
        display.value = factorial(parseInt(value));
        break;

      case '1/x':
        display.value = 1 / parse(value);
        break;

      case 'EE':
        display.value += 'e+';
        break;

      case 'Rand':
        display.value = Math.random();
        break;

      case 'RAD':
      case 'DEG':
        angleMode = angleMode === 'DEG' ? 'RAD' : 'DEG';
        document.getElementById('angle-toggle').textContent = angleMode;
        break;

      case 'mc':
        memory = 0;
        break;

      case 'm+':
        memory += parse(value);
        break;

      case 'm-':
        memory -= parse(value);
        break;

case 'backspace':
  const start = display.selectionStart;
  const end = display.selectionEnd;

  if (start === end && start > 0) {
    // No text selected, delete 1 character before cursor
    display.value = value.slice(0, start - 1) + value.slice(end);
    display.setSelectionRange(start - 1, start - 1);
  } else if (start !== end) {
    // Some text selected, delete entire selection
    display.value = value.slice(0, start) + value.slice(end);
    display.setSelectionRange(start, start);
  }

  if (display.value === '') display.value = '0';
  display.focus();
  break;

      case '^':
        insertAtEnd('^');
        break;

      default:
        if (value === '0' || value === 'Infinity' || value === 'NaN') {
          display.value = func;
        } else {
          display.value += func;
        }
    }
  } catch (e) {
    display.value = 'Error';
  }
}
