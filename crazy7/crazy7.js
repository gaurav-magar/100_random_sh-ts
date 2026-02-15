const compliments = [
    "You are smarter than you think 💡",
    "Your smile can light up a room 😊",
    "You have amazing potential 🚀",
    "You make the world better just by being in it 🌍",
    "Your creativity is inspiring 🎨",
    "You are doing better than you realize 💪",
    "You have a brilliant mind 🧠",
    "You radiate positive energy ✨",
    "You are capable of incredible things 🔥",
    "Someone is lucky to know you 💖"
];

const complimentText = document.getElementById("compliment");
const button = document.getElementById("btn");

button.addEventListener("click", () => {
    const randomIndex = Math.floor(Math.random() * compliments.length);

    complimentText.style.opacity = 0;

    setTimeout(() => {
        complimentText.textContent = compliments[randomIndex];
        complimentText.style.opacity = 1;
    }, 300);
});
