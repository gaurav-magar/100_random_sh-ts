const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let planets = [];
let cursor = { x: canvas.width / 2, y: canvas.height / 2 };

let mouseIdleTimer;
let isMouseIdle = false;
const idleDelay = 2000;

window.addEventListener("mousemove", e => {
    cursor.x = e.clientX;
    cursor.y = e.clientY;

    isMouseIdle = false;
    clearTimeout(mouseIdleTimer);
    mouseIdleTimer = setTimeout(() => {
        isMouseIdle = true;
    }, idleDelay);
});

canvas.addEventListener("dblclick", () => {
    planets.forEach(p => {
        p.vx *= 0.3;
        p.vy *= 0.3;
    });
});

function similar(a, b) {
    return a[0] === b[0];
}

function createPlanet(char) {
    let color = '#' + Math.floor(Math.random() * 16777215).toString(16);
    let size = Math.random() * 6 + 6;
    let maxAttempts = 20;
    let x, y;

    for (let i = 0; i < maxAttempts; i++) {
        let angle = Math.random() * Math.PI * 2;
        let distance = 50 + Math.random() * 50;
        x = cursor.x + Math.cos(angle) * distance;
        y = cursor.y + Math.sin(angle) * distance;

        let tooClose = planets.some(p => {
            let dx = p.x - x;
            let dy = p.y - y;
            let dist = Math.sqrt(dx * dx + dy * dy);
            return dist < (p.size + size + 5);
        });

        if (!tooClose) break;
    }

    let vx = (Math.random() - 0.5) * 0.1;
    let vy = (Math.random() - 0.5) * 0.1;

    return { char, x, y, vx, vy, size, color, connections: [] };
}

window.addEventListener("keypress", e => {
    let p = createPlanet(e.key);
    planets.forEach(other => {
        if (similar(other.char, e.key)) {
            p.connections.push(other);
            other.connections.push(p);
        }
    });
    planets.push(p);
});

function animate() {
    ctx.fillStyle = "rgba(11,11,11,0.15)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    planets.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        let dx = cursor.x - p.x;
        let dy = cursor.y - p.y;
        let dist = Math.sqrt(dx * dx + dy * dy);
        let force = Math.min(2, 150 / dist);
        p.vx += dx * 0.00025 * force;
        p.vy += dy * 0.00025 * force;

        if (p.x - p.size < 0) { p.x = p.size; p.vx *= -1; }
        if (p.x + p.size > canvas.width) { p.x = canvas.width - p.size; p.vx *= -1; }
        if (p.y - p.size < 0) { p.y = p.size; p.vy *= -1; }
        if (p.y + p.size > canvas.height) { p.y = canvas.height - p.size; p.vy *= -1; }

        if (isMouseIdle) {
            p.vx *= 0.95;
            p.vy *= 0.95;
        }

        p.vx *= 0.98;
        p.vy *= 0.98;
    });

    planets.forEach(p => {
        planets.forEach(other => {
            if (p === other) return;
            let dx = p.x - other.x;
            let dy = p.y - other.y;
            let dist = Math.sqrt(dx * dx + dy * dy);
            let minDist = p.size + other.size + 5;
            if (dist < minDist && dist > 0) {
                let push = (minDist - dist) / dist * 0.05;
                p.vx += dx * push;
                p.vy += dy * push;
            }
        });
    });

    planets.forEach(p => {
        p.connections.forEach(c => {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(c.x, c.y);
            ctx.strokeStyle = "rgba(255,255,255,0.15)";
            ctx.stroke();
        });

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();

        ctx.fillStyle = "white";
        ctx.font = p.size + "px Arial";
        ctx.fillText(p.char, p.x - p.size / 2, p.y + p.size / 2);
    });

    requestAnimationFrame(animate);
}

animate();