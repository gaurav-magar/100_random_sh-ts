const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");
const statusText = document.getElementById("status");
const timerEl = document.getElementById("timer");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let frozen = false;
let particles = [];
let startTime = Date.now();
let elapsedBeforeFreeze = 0;

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
    }

    draw() {
        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

for (let i = 0; i < 150; i++) {
    particles.push(new Particle());
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (!frozen) {
        particles.forEach(p => p.update());
    }

    particles.forEach(p => p.draw());

    requestAnimationFrame(animate);
}

animate();

function updateTimer() {
    if (!frozen) {
        const now = Date.now();
        const elapsed = elapsedBeforeFreeze + (now - startTime);
        const seconds = Math.floor(elapsed / 1000);

        const hrs = String(Math.floor(seconds / 3600)).padStart(2, "0");
        const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
        const secs = String(seconds % 60).padStart(2, "0");

        timerEl.textContent = `${hrs}:${mins}:${secs}`;
    }

    requestAnimationFrame(updateTimer);
}

updateTimer();

document.addEventListener("keydown", (e) => {
    if (e.code === "Space") {
        frozen = !frozen;

        if (frozen) {
            elapsedBeforeFreeze += Date.now() - startTime;
            statusText.textContent = "FROZEN";
            statusText.style.background = "rgba(255,0,0,0.2)";
            document.body.style.animationPlayState = "paused";
        } else {
            startTime = Date.now();
            statusText.textContent = "RUNNING";
            statusText.style.background = "rgba(0,255,0,0.2)";
            document.body.style.animationPlayState = "running";
        }
    }
});
