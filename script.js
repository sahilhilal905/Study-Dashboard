// ===============================
// STUDY DASHBOARD SCRIPT
// ===============================

// -------------------------------
// Timer Variables
// -------------------------------
let seconds = 0;
let minutes = 0;
let hours = 0;

let timer = null;
let totalSeconds = 0;

// -------------------------------
// Today's Date
// -------------------------------
const today = new Date().toLocaleDateString();

// -------------------------------
// Load Saved Data
// -------------------------------
const savedDate = localStorage.getItem("studyDate");
const savedTime = localStorage.getItem("studyTime");

if (savedDate === today) {
    totalSeconds = Number(savedTime) || 0;
} else {
    totalSeconds = 0;
    localStorage.setItem("studyDate", today);
    localStorage.setItem("studyTime", 0);
}

// -------------------------------
// HTML Elements
// -------------------------------
const timerDisplay = document.querySelector("#timer h3");
const totalHours = document.querySelector("#study p");

const startBtn = document.querySelectorAll("#timer button")[0];
const pauseBtn = document.querySelectorAll("#timer button")[1];
const resetBtn = document.querySelectorAll("#timer button")[2];
const saveBtn = document.querySelector("#study button");

// -------------------------------
// Update Timer Display
// -------------------------------
function updateDisplay() {

    timerDisplay.textContent =
        String(hours).padStart(2, "0") + ":" +
        String(minutes).padStart(2, "0") + ":" +
        String(seconds).padStart(2, "0");

}

// -------------------------------
// Update Total Study Time
// -------------------------------
function updateTotal() {

    let totalH = Math.floor(totalSeconds / 3600);
    let totalM = Math.floor((totalSeconds % 3600) / 60);

    totalHours.textContent =
        `Total Hours Today: ${totalH} Hours ${totalM} Minutes`;

}

// -------------------------------
// Start Timer
// -------------------------------
function startTimer() {

    if (timer !== null) return;

    timer = setInterval(function () {

        seconds++;

        if (seconds === 60) {
            seconds = 0;
            minutes++;
        }

        if (minutes === 60) {
            minutes = 0;
            hours++;
        }

        updateDisplay();

    }, 1000);

}

// -------------------------------
// Pause Timer
// -------------------------------
function pauseTimer() {

    clearInterval(timer);
    timer = null;

}

// -------------------------------
// Reset Timer
// -------------------------------
function resetTimer() {

    clearInterval(timer);
    timer = null;

    seconds = 0;
    minutes = 0;
    hours = 0;

    updateDisplay();

}

// -------------------------------
// Save Study Session
// -------------------------------
function saveSession() {

    let sessionSeconds =
        (hours * 3600) +
        (minutes * 60) +
        seconds;

    totalSeconds += sessionSeconds;

    localStorage.setItem("studyTime", totalSeconds);
    localStorage.setItem("studyDate", today);

    updateTotal();

    alert("Study Session Saved!");

    resetTimer();

}

// -------------------------------
// Button Events
// -------------------------------
startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);
saveBtn.addEventListener("click", saveSession);

// -------------------------------
// Initial Page Load
// -------------------------------
updateDisplay();
updateTotal();
