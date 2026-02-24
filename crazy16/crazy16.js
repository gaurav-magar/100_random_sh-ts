const btn = document.getElementById("btn");
const loading = document.getElementById("loading");
const result = document.querySelector(".result");
const aura = document.querySelector(".aura");
const waves = document.querySelector(".waves");
const type = document.getElementById("type");
const desc = document.getElementById("desc");

waves.style.opacity = 1;
btn.addEventListener("click", () => {

  btn.disabled = true;
  loading.style.opacity = 1;
  result.style.opacity = 0;

  setTimeout(() => {

    let total = 0;

    for(let i = 1; i <= 3; i++){
      let selected = document.querySelector(`input[name="q${i}"]:checked`);
      if(selected) total += +selected.value;
    }

    loading.style.opacity = 0;
    result.style.opacity = 1;
    aura.style.opacity = 1;

    if(total <= 4){
      type.innerText = "🧊 Calm Strategist";
      desc.innerText = "You observe deeply and move with precision.";
      aura.style.background = "blue";
      document.body.style.background =
        "linear-gradient(135deg,#0f2027,#203a43)";
    }
    else if(total <= 7){
      type.innerText = "🌿 Balanced Mind";
      desc.innerText = "You maintain harmony between logic and emotion.";
      aura.style.background = "green";
      document.body.style.background =
        "linear-gradient(135deg,#134e5e,#2c5364)";
    }
    else{
      type.innerText = "🔥 Chaos Creator";
      desc.innerText = "You thrive in intensity and bold action.";
      aura.style.background = "red";
      document.body.style.background =
        "linear-gradient(135deg,#360033,#0b8793)";
    }

    btn.disabled = false;

  }, 2500);

});