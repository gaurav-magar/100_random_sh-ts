let analyze = document.getElementById("analyze")
let climate = document.getElementById("climate")
let result = document.getElementById("result")

analyze.onclick = () => {

    result.innerHTML = "Analyzing your psychological climate..."

    setTimeout(() => {

        let data = new FormData(document.getElementById("quiz"))
        let scores = { sunny: 0, rainy: 0, snowy: 0, stormy: 0 }

        for (let val of data.values()) {
            scores[val]++
        }

        let max = Object.keys(scores).reduce((a, b) =>
            scores[a] > scores[b] ? a : b)

        climate.className = "climate " + max

        result.innerHTML = "You belong to a " + max.toUpperCase() + " climate"

    }, 2500)

}