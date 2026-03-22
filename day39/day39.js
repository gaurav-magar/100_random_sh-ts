let quickArr = [];
let mergeArr = [];
let speed = 800;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function generateArray() {
  const input = document.getElementById("arrayInput").value;
  quickArr = input.split(",").map(Number);
  mergeArr = [...quickArr];

  renderBars("quick-container", quickArr);
  renderBars("merge-container", mergeArr);
}

function renderBars(containerId, arr) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";

  arr.forEach(value => {
    const bar = document.createElement("div");
    bar.classList.add("bar");
    bar.style.height = value * 30 + "px";
    bar.innerText = value;
    container.appendChild(bar);
  });
}

function updateSpeed() {
  speed = document.getElementById("speed").value;
}

document.getElementById("speed").addEventListener("input", updateSpeed);

// 🔥 QUICK SORT
async function quickSort(arr, low, high, containerId) {
  if (low < high) {
    let pi = await partition(arr, low, high, containerId);
    await quickSort(arr, low, pi - 1, containerId);
    await quickSort(arr, pi + 1, high, containerId);
  }
}

async function partition(arr, low, high, containerId) {
  let pivot = arr[high];
  let i = low - 1;

  for (let j = low; j < high; j++) {
    if (arr[j] < pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
      renderBars(containerId, arr);
      await sleep(speed);
    }
  }

  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  renderBars(containerId, arr);
  await sleep(speed);

  return i + 1;
}

// 🔥 MERGE SORT
async function mergeSort(arr, l, r, containerId) {
  if (l >= r) return;

  let m = Math.floor((l + r) / 2);
  await mergeSort(arr, l, m, containerId);
  await mergeSort(arr, m + 1, r, containerId);
  await merge(arr, l, m, r, containerId);
}

async function merge(arr, l, m, r, containerId) {
  let left = arr.slice(l, m + 1);
  let right = arr.slice(m + 1, r + 1);

  let i = 0, j = 0, k = l;

  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      arr[k++] = left[i++];
    } else {
      arr[k++] = right[j++];
    }
    renderBars(containerId, arr);
    await sleep(speed);
  }

  while (i < left.length) {
    arr[k++] = left[i++];
    renderBars(containerId, arr);
    await sleep(speed);
  }

  while (j < right.length) {
    arr[k++] = right[j++];
    renderBars(containerId, arr);
    await sleep(speed);
  }
}

async function startSorting() {
  let quickStart = performance.now();
  let mergeStart = performance.now();

  await Promise.all([
    (async () => {
      await quickSort(quickArr, 0, quickArr.length - 1, "quick-container");
      let quickEnd = performance.now();
      document.getElementById("quick-time").innerText =
        "Time: " + ((quickEnd - quickStart) / 1000).toFixed(2) + " sec";
    })(),

    (async () => {
      await mergeSort(mergeArr, 0, mergeArr.length - 1, "merge-container");
      let mergeEnd = performance.now();
      document.getElementById("merge-time").innerText =
        "Time: " + ((mergeEnd - mergeStart) / 1000).toFixed(2) + " sec";
    })()
  ]);
}