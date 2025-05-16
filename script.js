let string = "";
let buttons = document.querySelectorAll('.button');
const input = document.querySelector('.input');

// Add animation class to buttons when clicked
function addClickAnimation(button) {
    button.classList.add('clicked');
    setTimeout(() => button.classList.remove('clicked'), 100);
}

// Format number with commas
function formatNumber(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

Array.from(buttons).forEach((button) => {
    button.addEventListener('click', (e) => {
        addClickAnimation(e.target);
        
        if (e.target.innerHTML === '=') {
            try {
                string = eval(string);
                // Format the result if it's a number
                if (!isNaN(string)) {
                    string = formatNumber(string);
                }
                input.value = string;
            } catch (error) {
                input.value = 'Error';
                string = '';
            }
        }
        else if (e.target.innerHTML === 'C') {
            string = "";
            input.value = "0";
        }
        else if (e.target.innerHTML === 'DEL') {
            string = string.substring(0, string.length - 1);
            input.value = string || "0";
        }
        else {
            // Prevent multiple decimal points
            if (e.target.innerHTML === '.' && string.includes('.')) {
                return;
            }
            // Prevent multiple operators
            if (['+', '-', '*', '/', '%'].includes(e.target.innerHTML) && 
                ['+', '-', '*', '/', '%'].includes(string[string.length - 1])) {
                return;
            }
            string = string + e.target.innerHTML;
            input.value = string;
        }
    });
});

// Add keyboard support
document.addEventListener('keydown', (e) => {
    const key = e.key;
    if (/[0-9]/.test(key) || ['+', '-', '*', '/', '.', '%'].includes(key)) {
        const button = Array.from(buttons).find(btn => btn.innerHTML === key);
        if (button) button.click();
    } else if (key === 'Enter') {
        const equalsButton = Array.from(buttons).find(btn => btn.innerHTML === '=');
        if (equalsButton) equalsButton.click();
    } else if (key === 'Backspace') {
        const delButton = Array.from(buttons).find(btn => btn.innerHTML === 'DEL');
        if (delButton) delButton.click();
    } else if (key === 'Escape') {
        const clearButton = Array.from(buttons).find(btn => btn.innerHTML === 'C');
        if (clearButton) clearButton.click();
    }
});