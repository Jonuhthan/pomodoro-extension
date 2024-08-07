let updatedTimer;    // global variable to reference in startTimer() and stopTimer()
let stopped = true;
let defaultTime;

// if on home page, initialize buttons and listen for actions
if (document.getElementById("homeIdentifier")) {
    defaultTime = document.getElementById("timer").innerText;

    // gets duration from local storage and updates the timer if one exists
    // savedDuration is string in the format "HH:MM"
    const savedDuration = localStorage.getItem('timerDuration');
    if (savedDuration) {
        document.getElementById("timer").innerText = savedDuration;
    }
    
    const startButton = document.getElementById('startButton');
    const stopButton = document.getElementById('stopButton');
    const resetButton = document.getElementById('resetButton');

    startButton.addEventListener('click', startTimer);
    stopButton.addEventListener('click', stopTimer);
    resetButton.addEventListener('click', resetTimer);
};

// start timer, swap buttons, and begin countdown
function startTimer() {
    if (!stopped) return;   // prevents a new setInterval call if a current timer is running

    stopped = false;
    swapButtons();

    updatedTimer = setInterval(() => {  // calls anon function each second
        const timer = document.getElementById("timer").innerText;
        let totalSeconds = getSeconds(timer);   // calculate total amount of seconds with helper function

        if (stopped) {
            clearInterval(updatedTimer);
        } else if (totalSeconds <= 0) {
            clearInterval(updatedTimer);
            timesUp();
        } else {
            totalSeconds--;     // decrement total then reformat back into string
            document.getElementById("timer").innerText = formatTimer(totalSeconds);
        }
    }, 1000);
} 

// stop timer, swap buttons, pause timer
function stopTimer() {
    clearInterval(updatedTimer);
    updatedTimer = null;
    stopped = true;
    swapButtons();
}

// swap button visibility
function swapButtons() {
    let startButton = document.getElementById("startButton");
    let startButtonStyle = window.getComputedStyle(startButton);
    let stopButton = document.getElementById("stopButton");

    if (startButtonStyle.display !== "none") {  // swaps
        startButton.style.display = "none";
        stopButton.style.display = "inline-block";
    } else {
        stopButton.style.display = "none";
        startButton.style.display = "inline-block";
    }
}

// reset timer
function resetTimer() {
    // set timer back to what it was before it started
    const savedDuration = localStorage.getItem('timerDuration');
    if (savedDuration) {
        document.getElementById("timer").innerText = savedDuration;
    } else {
        document.getElementById("timer").innerText = defaultTime;
    }

    if (!stopped) {
        stopTimer();    // allows user to start the reset timer themselves
    }
}

function timesUp() {
    document.getElementById("alarm").play();
    alert("Time's up! Enjoy your break :)");
}

// convert string HH:MM to seconds
function getSeconds(timerString) {
    const timerTokens = timerString.split(":");
    const minutes = Number(timerTokens[0]);
    const seconds = Number(timerTokens[1]);
    return minutes * 60 + seconds;
}

function formatTimer(totalSeconds) {
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return ((minutes < 10) ? `0${minutes}` : `${minutes}`) + ":" +  // format single-digit values accordingly
           ((seconds < 10) ? `0${seconds}` : `${seconds}`);
}