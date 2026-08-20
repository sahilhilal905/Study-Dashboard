// ===============================
// NEET STUDY DASHBOARD SCRIPT
// ===============================


// DATE DISPLAY
const dateElement = document.getElementById("date");

if(dateElement){
    const today = new Date();

    dateElement.innerHTML =
    today.toDateString();
}



// ===============================
// STUDY TIMER
// ===============================

let seconds = 0;
let timer = null;

const timeDisplay = document.getElementById("time");

function updateTimer(){

    let hrs = Math.floor(seconds / 3600);

    let mins = Math.floor((seconds % 3600) / 60);

    let secs = seconds % 60;


    timeDisplay.innerHTML =
    `${String(hrs).padStart(2,"0")}:${String(mins).padStart(2,"0")}:${String(secs).padStart(2,"0")}`;

}


function startTimer(){

    if(timer === null){

        timer = setInterval(()=>{

            seconds++;

            updateTimer();

        },1000);

    }

}



function pauseTimer(){

    clearInterval(timer);

    timer=null;

}



function resetTimer(){

    pauseTimer();

    seconds=0;

    updateTimer();

}



// Button connections

const buttons=document.querySelectorAll("#timer button");


if(buttons.length>=3){

buttons[0].onclick=startTimer;

buttons[1].onclick=pauseTimer;

buttons[2].onclick=resetTimer;

}



// ===============================
// STUDY SESSION SAVE
// ===============================


const saveButton=document.querySelector("#study button");


if(saveButton){

saveButton.onclick=function(){

let subject=document.querySelector("#study select").value;

let notes=document.querySelector("#study textarea").value;


let session={

subject:subject,

notes:notes,

time:new Date().toLocaleString(),

duration:seconds

};


let sessions=
JSON.parse(localStorage.getItem("sessions")) || [];


sessions.push(session);


localStorage.setItem(
"sessions",
JSON.stringify(sessions)
);



alert("Study Session Saved 🚀");


// Reset timer after saving

resetTimer();


};

}



// ===============================
// PROGRESS TRACKER
// ===============================


function updateProgress(){

let checks=document.querySelectorAll(
'input[type="checkbox"]'
);


let completed=0;


checks.forEach(check=>{

if(check.checked)
completed++;

});


let percentage=
Math.round(
(completed/checks.length)*100
);



let bar=document.querySelector(
".progress div"
);


if(bar){

bar.style.width=
percentage+"%";

}


localStorage.setItem(
"progress",
percentage
);

}



// Save checkbox state

const checkboxes=document.querySelectorAll(
'input[type="checkbox"]'
);


checkboxes.forEach((box,index)=>{


let saved=
localStorage.getItem(
"check_"+index
);


if(saved==="true")
box.checked=true;



box.addEventListener(
"change",
()=>{


localStorage.setItem(
"check_"+index,
box.checked
);


updateProgress();


});


});



updateProgress();

updateTimer();



// ===============================
// DAILY QUOTE SYSTEM
// ===============================


const quotes=[

"Success is built by small efforts repeated daily.",

"Discipline beats motivation.",

"Every chapter completed is a step closer to your dream.",

"Future doctors are built one study session at a time.",

"Consistency creates excellence."

];


const quoteElement=
document.getElementById("quote");


if(quoteElement){

let random=
Math.floor(
Math.random()*quotes.length
);


quoteElement.innerHTML=
quotes[random];

}
