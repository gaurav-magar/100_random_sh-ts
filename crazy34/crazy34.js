const graph = {
    A: ["B", "C"],
    B: ["D", "E"],
    C: ["F"],
    D: [],
    E: [],
    F: []
};

async function startBFS() {

    let visited = new Set();
    let queue = [];

    queue.push("A");
    visited.add("A");

    while (queue.length > 0) {

        let node = queue.shift();

        highlight(node);

        await sleep(800);

        document.getElementById(node).classList.remove("active");
        document.getElementById(node).classList.add("visited");

        for (let neighbor of graph[node]) {

            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                queue.push(neighbor);
            }

        }

    }

}

function highlight(id) {
    document.getElementById(id).classList.add("active");
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function resetGraph() {
    document.querySelectorAll(".node").forEach(node => {
        node.classList.remove("visited", "active");
    });
}