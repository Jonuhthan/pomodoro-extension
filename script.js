let stopped = true;
const originalTime = document.getElementById("timer").innerText;

// start timer, swap buttons, and begin countdown
function startTimer() {
    stopped = false;
    swapButtons();
    let updatedTimer = setInterval(() => {  // calls anon function each second
        const timerContent = document.getElementById("timer").innerText;
        const hours = Number(timerContent.slice(0,2));
        const minutes = Number(timerContent.slice(3, 5));
        const seconds = Number(timerContent.slice(6, 8));
        let totalSeconds = (hours * 3600) + (minutes * 60) + seconds;   // calculate total amount of seconds
        if (stopped || totalSeconds <= 0) {
            clearInterval(updatedTimer);
        } else {
            totalSeconds--;     // decrement total then reformat back into string
        }
        document.getElementById("timer").innerText = formatTimer(totalSeconds);
    }, 1000);
} 

// stop timer, swap buttons, pause timer
function stopTimer() {
    stopped = true;
    swapButtons();
}

// swap button visibility
function swapButtons() {
    let startButton = document.getElementById("startButton");
    let startButtonStyle = window.getComputedStyle(startButton);
    let stopButton = document.getElementById("stopButton");

    if (startButtonStyle.display !== "none") {
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
    document.getElementById("timer").innerText = originalTime;

    if (!stopped) {
        stopTimer();    // allows user to start the reset timer themselves
    }
}

function formatTimer(totalSeconds) {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return ((hours < 10) ? `0${hours}` : `${hours}`) + ":" +        // format single-digit values accordingly
           ((minutes < 10) ? `0${minutes}` : `${minutes}`) + ":" +
           ((seconds < 10) ? `0${seconds}` : `${seconds}`);
}