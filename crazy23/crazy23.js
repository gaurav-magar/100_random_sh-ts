const selector = document.getElementById("dsSelector");
const visualization = document.getElementById("visualization");
const speedControl = document.getElementById("speedControl");
const valueInput = document.getElementById("valueInput");

let structure = "stack";
let data = [];
let array = [];

selector.addEventListener("change", () => {
  structure = selector.value;
  resetAll();
  toggleButtons();
});

function toggleButtons() {
  if (structure === "sorting") {
    document.getElementById("actionButtons").style.display = "none";
    document.getElementById("sortingButtons").style.display = "block";
    valueInput.style.display = "none";
  } else {
    document.getElementById("actionButtons").style.display = "block";
    document.getElementById("sortingButtons").style.display = "none";
    valueInput.style.display = "block";
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function addElement() {
  const value = valueInput.value;
  if (!value) return;

  if (structure === "stack") {
    data.push(value);
  } else if (structure === "queue") {
    data.push(value);
  }

  render();
  valueInput.value = "";
}

function removeElement() {
  if (structure === "stack") {
    data.pop();
  } else if (structure === "queue") {
    data.shift();
  }

  render();
}

function render() {
  visualization.innerHTML = "";

  if (structure === "stack") {
    visualization.style.flexDirection = "column-reverse";
  } else {
    visualization.style.flexDirection = "row";
  }

  data.forEach(val => {
    const div = document.createElement("div");
    div.className = "block";
    div.textContent = val;
    visualization.appendChild(div);
  });
}

function resetAll() {
  data = [];
  array = [];
  visualization.innerHTML = "";
}


function generateArray() {
  array = [];
  visualization.innerHTML = "";
  visualization.style.flexDirection = "row";

  for (let i = 0; i < 20; i++) {
    const value = Math.floor(Math.random() * 200) + 20;
    array.push(value);

    const bar = document.createElement("div");
    bar.classList.add("bar");
    bar.style.height = value + "px";
    visualization.appendChild(bar);
  }
}

async function bubbleSort() {
  const bars = document.getElementsByClassName("bar");

  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {

      bars[j].style.background = "yellow";
      bars[j + 1].style.background = "yellow";

      await sleep(speedControl.value);

      if (array[j] > array[j + 1]) {

        let temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;

        bars[j].style.height = array[j] + "px";
        bars[j + 1].style.height = array[j + 1] + "px";
      }

      bars[j].style.background = "#f78166";
      bars[j + 1].style.background = "#f78166";
    }

    bars[array.length - i - 1].style.background = "green";
  }
}