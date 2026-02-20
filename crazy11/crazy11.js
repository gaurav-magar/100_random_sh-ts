const keys=document.querySelectorAll(".key");
const display=document.getElementById("display");

let text="";

document.addEventListener("keydown",e=>{

let key=e.key.toUpperCase();

/* KEY PRESS ANIMATION */
if(key===" ") key=" ";
if(key==="BACKSPACE") key="BACKSPACE";
if(key==="ENTER") key="ENTER";
if(key==="SHIFT") key="SHIFT";
if(key==="CONTROL") key="CONTROL";
if(key==="TAB") key="TAB";
if(key==="CAPSLOCK") key="CAPSLOCK";
if(key==="ALT") key="ALT";

keys.forEach(k=>{
if(k.dataset.key===key){
k.classList.add("active");
}
});

/* DISPLAY LOGIC */

if(e.key==="Backspace"){
text=text.slice(0,-1);
}
else if(e.key==="Enter"){
text+="\n";
}
else if(e.key===" "){
text+=" ";
}
else if(e.key.length===1){
text+=e.key;
}

display.innerText=text;

});


document.addEventListener("keyup",e=>{

let key=e.key.toUpperCase();

if(key===" ") key=" ";
if(key==="BACKSPACE") key="BACKSPACE";
if(key==="ENTER") key="ENTER";
if(key==="SHIFT") key="SHIFT";
if(key==="CONTROL") key="CONTROL";
if(key==="TAB") key="TAB";
if(key==="CAPSLOCK") key="CAPSLOCK";
if(key==="ALT") key="ALT";

keys.forEach(k=>{
if(k.dataset.key===key){
k.classList.remove("active");
}
});

});