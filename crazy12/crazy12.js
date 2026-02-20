const runBtn = document.getElementById("run");
const htmlCode = document.getElementById("htmlCode");
const cssCode = document.getElementById("cssCode");
const jsCode = document.getElementById("jsCode");
const output = document.getElementById("output");
const outputContainer = document.getElementById("outputContainer");
const openOutputBtn = document.getElementById("openOutput");
const closeOutputBtn = document.getElementById("closeOutput");

runBtn.addEventListener("click", runCode);

function runCode() {
  const html = htmlCode.value;
  const css = "<style>" + cssCode.value + "</style>";
  const js = "<script>" + jsCode.value + "<\/script>";

  output.srcdoc = html + css + js;
}

openOutputBtn.addEventListener("click", () => {
  runCode(); 
  outputContainer.style.display = "flex";
});

closeOutputBtn.addEventListener("click", () => {
  outputContainer.style.display = "none";
});

htmlCode.value = `<h1>Hello World</h1>
<p>Edit code and click Run or Open Output.</p>`;

cssCode.value = `h1 { color: red; text-align: center; }`;

jsCode.value = `document.querySelector("h1").addEventListener("click", () => { alert("Hello!"); });`;