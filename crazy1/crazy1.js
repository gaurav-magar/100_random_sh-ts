let boxes = document.getElementById("box");
let options = [];
let colors = ["red", "green", "blue", "orange", "purple", "navy", "maroon", "teal", "gray"];
if (confirm("Do you want to enter your own choices?:")) {
    let n = prompt("Enter the number of choices you want to enter");
    for (let i = 0; i < n; i++) {
        options[i] = prompt(`Enter the ${i + 1} choice: `);

        let newDiv = document.createElement("div");
        newDiv.textContent = options[i];

        let colorsIndex = Math.floor(Math.random() * colors.length);
        newDiv.style.backgroundColor = colors[colorsIndex];
        newDiv.style.color = "white";

        newDiv.classList.add(colors[colorsIndex], "boxes");
        boxes.appendChild(newDiv);
    }
}
else {
    options = ["read", "code", "make notes", "sleep"];
    for(let i =0; i< options.length; i++){

        let newDiv = document.createElement("div");
        newDiv.textContent = options[i];
        
        let colorsIndex = Math.floor(Math.random() * colors.length);
        newDiv.style.backgroundColor = colors[colorsIndex];
        newDiv.style.color = "white";
        
        newDiv.classList.add(colors[colorsIndex], "boxes");
        boxes.appendChild(newDiv);
    }
}
function spins() {
    document.getElementById("spinButton").innerHTML = "Spin Again!!!"
    const index = Math.floor(Math.random() * options.length);

    let resultBox = document.getElementById("resultContainer");
    resultBox.classList.remove("show");
    resultBox.classList.add("hide");


    boxes.style.transition = "transform 2s ease-in-out";
    boxes.style.transform = "translateX(1000px)";

    setTimeout(() => {
        boxes.style.transition = "transform 2s ease-in-out";
        boxes.style.transform = "translateX(-1000px)";
    }, 2000);

    setTimeout(() => {
        boxes.style.transition = "transform 2s ease-in-out";
        boxes.style.transform = "translateX(0)";
    }, 4000);

    setTimeout(() => {
        document.querySelector(".hide").classList.toggle("show");
        document.getElementById("result").innerHTML = options[index];
    }, 6000);

}