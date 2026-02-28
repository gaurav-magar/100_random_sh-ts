const startMenu = document.getElementById("startMenu");
let highestZ = 10;

function openWindow(id) {
  const win = document.getElementById(id);
  win.style.display = "block";
  win.style.zIndex = ++highestZ;
}

function closeWindow(id) {
  document.getElementById(id).style.display = "none";
}

document.querySelectorAll(".window").forEach(win => {
  const header = win.querySelector(".window-header");

  let offsetX = 0;
  let offsetY = 0;
  let isDragging = false;

  header.addEventListener("mousedown", (e) => {
    isDragging = true;
    win.style.zIndex = ++highestZ;
    offsetX = e.clientX - win.offsetLeft;
    offsetY = e.clientY - win.offsetTop;
  });

  document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    win.style.left = e.clientX - offsetX + "px";
    win.style.top = e.clientY - offsetY + "px";
  });

  document.addEventListener("mouseup", () => {
    isDragging = false;
  });
});


function toggleMenu() {
  startMenu.style.display =
    startMenu.style.display === "block" ? "none" : "block";
}

document.addEventListener("click", function(e) {
  if (!e.target.closest(".start-btn") &&
      !e.target.closest(".start-menu")) {
    startMenu.style.display = "none";
  }
});

const updateClock = () => {
  const now = new Date();
  document.getElementById("clock").textContent = now.toLocaleTimeString();
  document.getElementById("date").textContent = now.toLocaleDateString();
};

setInterval(updateClock, 1000);
updateClock();
