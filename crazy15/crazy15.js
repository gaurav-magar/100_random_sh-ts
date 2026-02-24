document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("wishForm");
    const modal = document.getElementById("modal");
    const modalContent = document.getElementById("modal-content");
    const modalClose = document.querySelector(".modal-close");

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const age = document.getElementById("age").value.trim();
        const category = document.getElementById("category").value;

        if (!name || !category) {
            alert("Please enter a name and select a category!");
            return;
        }
        let compliment = "";
        switch (category) {
            case "coding":
                compliment = `Happy Birthday, ${name} ! 🎉 On this special day, may your code always compile flawlessly and your creativity flow endlessly. Just as every line of code you write builds something meaningful, may every moment of this year build joy, success, and cherished memories. Wishing you bug‑free days, exciting projects, and a future filled with innovation and happiness.`;
                break;

            case "design":
                compliment = `Happy Birthday, ${name} ! 🎂 Your eye for beauty and detail makes the world brighter. May this year be painted with vibrant opportunities, bold ideas, and endless inspiration. Just like your designs captivate hearts, may your journey ahead captivate you with joy, love, and unforgettable experiences. Wishing you a colorful celebration and a year as stunning as your creativity.`;
                break;

            case "other":
                compliment = `Happy Birthday, ${name} ! ✨ Today is all about celebrating the wonderful person you are. May laughter echo through your days, may love surround you always, and may success follow you wherever you go. This year, may every sunrise bring new hope and every sunset leave you with gratitude. Wishing you a magical birthday filled with warmth, happiness, and dreams coming true.`;
                break;

            default:
                compliment = `Happy Birthday, ${name} ! 🎈 May your special day overflow with joy, love, and unforgettable memories. Here’s to another year of growth, happiness, and endless possibilities.`;
        }


        modalContent.innerHTML = `
      <strong>${compliment}</strong>
    `;
        modal.style.display = "flex";
    });

    modalClose.addEventListener("click", () => {
        modal.style.display = "none";
    });

    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });

    const bg = document.querySelector(".bg");
    const emojis = ["🎁", "🎉", "🎈", "✨", "💖"];
    const totalGifts = 60;
    for (let i = 0; i < totalGifts; i++) {
        let span = document.createElement("span");
        span.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];
        span.style.left = Math.random() * window.innerWidth + "px";
        span.style.top = Math.random() * window.innerHeight + "px";
        span.style.fontSize = (14 + Math.random() * 24) + "px";
        span.style.animationDuration = (3 + Math.random() * 4) + "s";
        span.style.animationDelay = Math.random() * 2 + "s"; bg.appendChild(span);
    }
});
