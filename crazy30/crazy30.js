let list = []

const container = document.getElementById("listContainer")
const statusText = document.getElementById("status")

function renderList() {

    container.innerHTML = ""

    list.forEach((value, index) => {

        let node = document.createElement("div")
        node.classList.add("node")
        node.innerText = value

        container.appendChild(node)

        if (index < list.length - 1) {

            let arrow = document.createElement("div")
            arrow.classList.add("arrow")
            arrow.innerText = "→"

            container.appendChild(arrow)

        }

    })

}

function insertNode() {

    let value = parseInt(document.getElementById("valueInput").value)

    if (isNaN(value)) {
        statusText.innerText = "Enter valid value"
        return
    }

    list.push(value)

    statusText.innerText = "Inserted node " + value

    renderList()

}

function deleteNode() {

    let value = parseInt(document.getElementById("valueInput").value)

    let index = list.indexOf(value)

    if (index === -1) {
        statusText.innerText = "Value not found"
        return
    }

    list.splice(index, 1)

    statusText.innerText = "Deleted node " + value

    renderList()

}

async function searchNode() {

    let value = parseInt(document.getElementById("valueInput").value)

    let nodes = document.getElementsByClassName("node")

    for (let i = 0; i < list.length; i++) {

        nodes[i].classList.add("highlight")

        await new Promise(r => setTimeout(r, 400))

        if (list[i] === value) {

            nodes[i].classList.remove("highlight")
            nodes[i].classList.add("found")

            statusText.innerText = "Node found"

            return
        }

        nodes[i].classList.remove("highlight")

    }

    statusText.innerText = "Value not found"

}

function resetList() {

    list = []

    container.innerHTML = ""

    statusText.innerText = "List reset"

}