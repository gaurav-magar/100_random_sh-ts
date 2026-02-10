let lists = document.querySelectorAll("#listElements li");
let lis = document.getElementsByTagName("li");
lists.forEach(li => {
    const randomPadding = Math.floor(Math.random() * 200);
    li.style.marginTop = randomPadding + "px";
    const randomColor = `hsl(${Math.floor(Math.random() * 360)}, 70%, 60%)`;
    li.style.backgroundColor = randomColor;
    li.style.boxShadow = `3px 3px 10px ${randomColor} `;
});
let gravityEnabled = false;

function gravityOn() {
    for (let i = 0; i < lis.length; i++) {
        lis[i].style.animation = "fall 2s forwards";
    }
    gravityEnabled = true;
}
function gravityOff() {
    if (gravityEnabled) {
        for (let i = 0; i < lis.length; i++) {
            lis[i].style.animation = "rise 2s forwards";
            // adds the updown keyframe animation to each li item
            lis[i].addEventListener("animationend", () => {
                lis[i].style.animation = "updown 4s linear infinite";
            }, { once: true });
        }
        gravityEnabled = false;
    } else {
        for (let i = 0; i < lis.length; i++) {
            lis[i].style.animation = "updown 4s linear infinite";
        }
    }
}
