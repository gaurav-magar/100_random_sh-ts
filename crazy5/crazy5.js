// js code to accept the elements by using id
const display = document.getElementById("display");
const sarcasm = document.getElementById("sarcasm");

let lastResult = null;
let lastExpression = "";

function append(value) {
    if (display.innerText === "0") {
        display.innerText = value;
    } else {
        display.innerText += value;
    }

    lastResult = null;
}

function clearDisplay() {
    display.innerText = "0";
    sarcasm.innerText = "";
    lastResult = null;
    lastExpression = "";
}

function backspace() {
    if (display.innerText.length === 1) {
        display.innerText = "0";
    } else {
        display.innerText = display.innerText.slice(0, -1);
    }
    lastResult = null;
}

function calculate() {
    try {
        const expression = display.innerText;

        if (expression === lastExpression) return;

        const result = eval(expression);

        display.innerText = result;

        lastResult = result;
        lastExpression = expression;

        generateSarcasm(result);

    } catch {
        display.innerText = "Error";
        sarcasm.innerText = "Even I refuse to calculate that.";
        lastResult = null;
        lastExpression = "";
    }
}

function generateSarcasm(result) {
    const lines = [
        "Wow. That required technology?",
        "Basic math champion.",
        "You could've done that mentally.",
        "Groundbreaking discovery.",
        "I hope you feel accomplished.",
        "NASA is calling.",
        "Such intelligence. Truly.",
        "That’s it. Nothing more."
    ];

    if (result === 69) {
        sarcasm.innerText = "Nice. Very mature.";
        return;
    }

    if (result === 0) {
        sarcasm.innerText = "Zero. Just like your discipline.";
        return;
    }

    if (result > 1000000) {
        sarcasm.innerText = "Calm down billionaire.";
        return;
    }

    sarcasm.innerText =
        lines[Math.floor(Math.random() * lines.length)];
}
