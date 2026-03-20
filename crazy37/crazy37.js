let array = [];
const container = document.getElementById("array-container");

function setArray() {
    const input = document.getElementById("array-input").value;
    array = input.split(",").map(num => parseInt(num.trim())).filter(num => !isNaN(num));

    if (array.length === 0) {
        alert("Please enter valid numbers!");
        return;
    }

    renderArray();
}

function resetArray() {
    array = [];
    container.innerHTML = "";
    document.getElementById("array-input").value = "";
}

function renderArray() {
    container.innerHTML = "";

    array.forEach(value => {
        const bar = document.createElement("div");
        bar.classList.add("bar");
        bar.style.height = value * 3 + "px";

        // 👇 create label
        const label = document.createElement("span");
        label.innerText = value;
        label.classList.add("bar-label");

        bar.appendChild(label);
        container.appendChild(bar);
    });
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function selectionSort() {
    let bars = document.getElementsByClassName("bar");

    for (let i = 0; i < array.length; i++) {
        let minIndex = i;
        bars[i].style.background = "yellow";

        for (let j = i + 1; j < array.length; j++) {
            bars[j].style.background = "red";

            await sleep(800);

            if (array[j] < array[minIndex]) {
                minIndex = j;
            }

            bars[j].style.background = "#00c9ff";
        }

[array[i], array[minIndex]] = [array[minIndex], array[i]];

bars[i].style.height = array[i] * 3 + "px";
bars[minIndex].style.height = array[minIndex] * 3 + "px";

bars[i].querySelector("span").innerText = array[i];
bars[minIndex].querySelector("span").innerText = array[minIndex];

bars[i].style.background = "green";
    }
}