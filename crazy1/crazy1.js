function spins(){
    let boxes = document.getElementById("box");
    let options = ["read","code","make notes","sleep"];
    const index = Math.floor(Math.random() * options.length);

    let resultBox = document.getElementById("resultContainer");
    resultBox.classList.remove("show");
    resultBox.classList.add("hide");

    boxes.style.transition = "transform 2s ease-in-out";
    boxes.style.transform = "translateX(1000px)";

    setTimeout(()=>{
        boxes.style.transition = "transform 2s ease-in-out";
        boxes.style.transform = "translateX(-1000px)";
    },2000);

    setTimeout(()=>{
        boxes.style.transition = "transform 2s ease-in-out";
        boxes.style.transform = "translateX(0)";
        document.querySelector(".hide").classList.toggle("show");
        document.getElementById("result").innerHTML = options[index];
        console.log(`index: ${index}, result: ${options[index]}`)
    },4000);
    
}