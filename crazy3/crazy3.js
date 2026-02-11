const roasts = [
    "Still waiting… just like your future employer.",
    "Your notes are auditioning for 'Worst Paper Pile 2026'.",
    "Oh sure, keep ignoring it. Recruiters *love* blank pages.",
    "Instant noodles again? Bold choice, chef.",
    "Your sneakers are gathering more dust than your GitHub repo.",
    "This task is aging like milk."
];

const tasks = [];

function addTask() {
    const input = document.getElementById("taskInput");
    const text = input.value.trim();
    if (text) {
        const task = {
            text,
            done: false,
            roast: "",
            timeLeft: 600, // 10 minutes in seconds
            timerId: null
        };
        startTimer(task);
        tasks.push(task);
        input.value = "";
        renderTasks();
    }
}

function startTimer(task) {
    task.timerId = setInterval(() => {
        if (!task.done) {
            task.timeLeft--;
            if (task.timeLeft <= 0) {
                clearInterval(task.timerId);
                task.roast = roasts[Math.floor(Math.random() * roasts.length)];
            }
            renderTasks();
        }
    }, 1000);
}

function renderTasks() {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");

        const span = document.createElement("span");
        span.textContent = task.text;
        if (task.done) span.classList.add("done");

        const info = document.createElement("span");
        if (task.done) {
            info.textContent = " ✔ Completed!";
        } else if (task.roast) {
            info.textContent = " - " + task.roast;
            info.className = "roast";
        } else {
            info.textContent = " ⏳ " + formatTime(task.timeLeft);
            info.className = "timer";
        }

        const actions = document.createElement("div");
        actions.className = "actions";

        const completeBtn = document.createElement("button");
        completeBtn.textContent = task.done ? "Undo" : "✓";
        completeBtn.className = "complete-btn";
        completeBtn.onclick = () => toggleTask(index);

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "✕";
        deleteBtn.className = "delete-btn";
        deleteBtn.onclick = () => {
            clearInterval(task.timerId);
            tasks.splice(index, 1);
            renderTasks();
        };

        actions.appendChild(completeBtn);
        actions.appendChild(deleteBtn);

        li.appendChild(span);
        li.appendChild(info);
        li.appendChild(actions);

        taskList.appendChild(li);
    });
}

function toggleTask(index) {
    const task = tasks[index];
    task.done = !task.done;
    if (task.done) {
        clearInterval(task.timerId);
        task.roast = "";
    } else {
        task.timeLeft = 600;
        startTimer(task);
    }
    renderTasks();
}

function formatTime(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
}
