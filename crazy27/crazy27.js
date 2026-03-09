const playground = document.getElementById("playground")
const display = document.getElementById("display")
const justify = document.getElementById("justify")
const align = document.getElementById("align")
const columns = document.getElementById("columns")
const cssCode = document.getElementById("cssCode")

function updateLayout() {

    const displayValue = display.value
    const justifyValue = justify.value
    const alignValue = align.value
    const columnValue = columns.value

    playground.style.display = displayValue

    if (displayValue === "flex") {

        playground.style.justifyContent = justifyValue
        playground.style.alignItems = alignValue
        playground.style.gridTemplateColumns = ""

        cssCode.innerText =
            `display: flex;
justify-content: ${justifyValue};
align-items: ${alignValue};`

    }

    if (displayValue === "grid") {

        playground.style.gridTemplateColumns = `repeat(${columnValue}, 1fr)`
        playground.style.justifyContent = ""
        playground.style.alignItems = ""

        cssCode.innerText =
            `display: grid;
grid-template-columns: repeat(${columnValue}, 1fr);
gap: 10px;`

    }

}

display.addEventListener("change", updateLayout)
justify.addEventListener("change", updateLayout)
align.addEventListener("change", updateLayout)
columns.addEventListener("input", updateLayout)

updateLayout()