let currentInput = '';
const screen = document.getElementById('screen');

function updateScreen() {
    screen.value = currentInput || '0';
}

function appendNumber(num) {
    if (num === '.' && currentInput.includes('.')) return;
    currentInput += num;
    updateScreen();
}

function appendOperator(op) {
    if (currentInput === '') return;
    const lastChar = currentInput.slice(-1);
    if (['+', '-', '*', '/'].includes(lastChar)) {
        currentInput = currentInput.slice(0, -1) + op;
    } else {
        currentInput += op;
    }
    updateScreen();
}

function clearScreen() {
    currentInput = '';
    updateScreen();
}

function backspace() {
    currentInput = currentInput.toString().slice(0, -1);
    updateScreen();
}

function calculate() {
    try {
        // Заменяем визуальные операторы на вычисляемые
        let expression = currentInput;
        
        // Проверка на корректность выражения
        if (!expression) return;
        
        // Вычисление результата
        // Используем Function вместо eval для большей безопасности
        const result = new Function('return ' + expression)();
        
        // Округление до разумного количества знаков, чтобы избежать проблем с плавающей точкой
        const roundedResult = Math.round(result * 100000000) / 100000000;
        
        currentInput = roundedResult.toString();
        updateScreen();
    } catch (error) {
        currentInput = 'Ошибка';
        updateScreen();
        setTimeout(() => {
            currentInput = '';
            updateScreen();
        }, 1500);
    }
}

// Поддержка ввода с клавиатуры
document.addEventListener('keydown', (event) => {
    const key = event.key;
    
    if (/[0-9]/.test(key)) {
        appendNumber(key);
    } else if (key === '.') {
        appendNumber('.');
    } else if (['+', '-', '*', '/'].includes(key)) {
        appendOperator(key);
    } else if (key === 'Enter' || key === '=') {
        event.preventDefault();
        calculate();
    } else if (key === 'Backspace') {
        backspace();
    } else if (key === 'Escape' || key === 'c' || key === 'C') {
        clearScreen();
    }
});
