const choices = document.querySelectorAll(".choice");
const resultText = document.getElementById("resultText");
const userScoreEl = document.getElementById("userScore");
const compScoreEl = document.getElementById("compScore");
const compChoiceDisplay = document.getElementById("compChoiceDisplay");

let userScore = 0;
let compScore = 0;
const options = ["rock", "paper", "scissors"];

function getComputerChoice() {
    const randomIndex = Math.floor(Math.random() * 3);
    return options[randomIndex];
}

function getWinner(user, comp) {
    if (user === comp) return "draw";
    if (
        (user === "rock" && comp === "scissors") ||
        (user === "paper" && comp === "rock") ||
        (user === "scissors" && comp === "paper")
    ) {
        return "user";
    }
    return "computer";
}

function resetGame() {
    userScore = 0;
    compScore = 0;
    userScoreEl.textContent = userScore;
    compScoreEl.textContent = compScore;
    resultText.textContent = "New Match! Make your move!";
    compChoiceDisplay.innerHTML = "<p> Waiting...</p>";
}

choices.forEach(button => {
    button.addEventListener("click", () => {
        const userChoice = button.dataset.choice;

        button.classList.add("active");
        setTimeout(() => button.classList.remove("active"), 600);

        resultText.textContent = "Computer is thinking... ";
        compChoiceDisplay.innerHTML = "<p> Thinking...</p>";

        setTimeout(() => {
            const compChoice = getComputerChoice();
            const winner = getWinner(userChoice, compChoice);

            compChoiceDisplay.innerHTML = `
                <img src="${compChoice}.png" alt="${compChoice}">
                <p>${compChoice.toUpperCase()}</p>
            `;

            if (winner === "draw") {
                resultText.textContent = `It's a Draw! (${userChoice} vs ${compChoice})`;
            } else if (winner === "user") {
                userScore++;
                userScoreEl.textContent = userScore;
                resultText.textContent = `You Win! (${userChoice} beats ${compChoice})`;
            } else {
                compScore++;
                compScoreEl.textContent = compScore;
                resultText.textContent = `You Lose! (${compChoice} beats ${userChoice})`;
            }

            if (userScore === 5 || compScore === 5) {
                resultText.textContent = userScore === 5 
                    ? " You won the match!" 
                    : " Computer wins the match!";
                setTimeout(resetGame, 3000);
            }
        }, 1000); 
    });
});
