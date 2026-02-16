const input = document.getElementById("commandInput");
const output = document.getElementById("output");
const terminal = document.getElementById("terminal");

const commands = {
    help: `Available commands:
help        Show all commands
about       About me
skills      My skills
projects    My projects
contact     Contact info
clear       Clear terminal
theme       Toggle theme
whoami      Display user
date        Current date`,

    about: `Hi, I'm Gaurav 👋
Computer Science Student
Focused on Backend & Frontend Development.
I build creative and interactive web apps.`,

    skills: `Skills:
- HTML, CSS, JavaScript
- MongoDB
- Node.js (Learning)
- UI/UX Experiments
- Creative Frontend Projects`,

    projects: `Projects:
- Hacker Terminal Portfolio
- Savage To-Do List
- Gravity Toggle Page
- Random Compliment Generator`,

    contact: `Contact:
Email: gaurav@example.com
GitHub: github.com/yourusername
LinkedIn: linkedin.com/in/yourprofile`,

    whoami: "gaurav",
    date: new Date().toString()
};

let history = [];
let historyIndex = -1;

/* Typing animation */
function typeText(text) {
    return new Promise(resolve => {
        let i = 0;
        const div = document.createElement("div");
        output.appendChild(div);

        function typing() {
            if (i < text.length) {
                div.textContent += text.charAt(i);
                i++;
                terminal.scrollTop = terminal.scrollHeight;
                setTimeout(typing, 10);
            } else {
                resolve();
            }
        }
        typing();
    });
}

async function runCommand(cmd) {
    const commandLine = document.createElement("div");
    commandLine.innerHTML = `<span style="color:var(--accent)">user@host:~$</span> ${cmd}`;
    output.appendChild(commandLine);

    if (cmd === "clear") {
        output.innerHTML = "";
        return;
    }

    if (cmd === "theme") {
        toggleTheme();
        return;
    }

    if (commands[cmd]) {
        await typeText(commands[cmd]);
    } else {
        await typeText(`Command not found: ${cmd}\nType "help"`);
    }
}

function toggleTheme() {
    const root = document.documentElement;
    const current = getComputedStyle(root).getPropertyValue('--text').trim();

    if (current === '#00ff9c') {
        root.style.setProperty('--text', '#58a6ff');
        root.style.setProperty('--accent', '#1f6feb');
    } else {
        root.style.setProperty('--text', '#00ff9c');
        root.style.setProperty('--accent', '#00ffaa');
    }
}

/* Event listeners */
input.addEventListener("keydown", async (e) => {

    if (e.key === "Enter") {
        const cmd = input.value.trim();
        if (!cmd) return;

        history.push(cmd);
        historyIndex = history.length;

        await runCommand(cmd);
        input.value = "";
    }

    if (e.key === "ArrowUp") {
        if (historyIndex > 0) {
            historyIndex--;
            input.value = history[historyIndex];
        }
    }

    if (e.key === "ArrowDown") {
        if (historyIndex < history.length - 1) {
            historyIndex++;
            input.value = history[historyIndex];
        } else {
            input.value = "";
        }
    }

    if (e.key === "Tab") {
        e.preventDefault();
        const partial = input.value;
        const match = Object.keys(commands).find(c => c.startsWith(partial));
        if (match) input.value = match;
    }
});

/* Matrix Rain */
const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const letters = "01ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const fontSize = 14;
const columns = canvas.width / fontSize;
const drops = Array(Math.floor(columns)).fill(1);

function draw() {
    ctx.fillStyle = "rgba(0,0,0,0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#00ff9c";
    ctx.font = fontSize + "px monospace";

    drops.forEach((y, i) => {
        const text = letters[Math.floor(Math.random() * letters.length)];
        ctx.fillText(text, i * fontSize, y * fontSize);

        if (y * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    });
}

setInterval(draw, 33);
