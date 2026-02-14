const who = [
    "My dog",
    "My grandma",
    "The delivery guy",
    "My neighbor",
    "A random kid",
    "My boss (ironically)"
];

const action = [
    "ate",
    "destroyed",
    "hid",
    "threw away",
    "spilled coffee on",
    "set fire to"
];

const what = [
    "my homework",
    "my laptop",
    "the project file",
    "my phone",
    "the office keys",
    "my charger"
];

const when = [
    "right before the deadline",
    "this morning",
    "last night",
    "on my way here",
    "during lunch",
    "while I was sleeping"
];

function getRandomItem(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function generateExcuse() {
    const excuse = `${getRandomItem(who)} ${getRandomItem(action)} ${getRandomItem(what)} ${getRandomItem(when)}.`;
    document.getElementById("excuse").textContent = excuse;
}
