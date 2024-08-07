if (document.getElementById("settingsIdentifier")) {
    const submitButton = document.getElementById("submitButton");

    submitButton.addEventListener("click", () => {
        let pomodoroTime = document.getElementById("pomodoroTime");
        let breakTime = document.getElementById("breakTime");

        // verify something was entered for pomodoroTime
        if (pomodoroTime && pomodoroTime.value) {
            // handle value edge cases
            if (pomodoroTime.value <= 0) {
                pomodoroTime.value = 1;
            } else if (pomodoroTime.value > 999) {
                pomodoroTime.value = 999;
            }
        } else {
            // replace pomodoroTime with the value from the home page or 25 as default
            const savedDuration = localStorage.getItem('pomodoroDuration');
            if (savedDuration) {
                pomodoroTime.value = Number(savedDuration.split(":")[0]);
            } else {
                pomodoroTime.value = 25;
            }
        }

        // same edge case handling for break time
        if (breakTime && breakTime.value) {
            // handle value edge cases
            if (breakTime.value <= 0) {
                breakTime.value = 1;
            } else if (breakTime.value > 999) {
                breakTime.value = 999;
            }
        } else {
            const breakDuration = localStorage.getItem('breakDuration');
            if (breakDuration) {
                breakTime.value = Number(breakDuration.split(":")[0]);
            } else {
                breakTime.value = 5;    
            }
        }

        // update timer duration and redirect user back to home page
        localStorage.setItem("pomodoroDuration", formatTimer(getSeconds(pomodoroTime.value + ":00")));
        localStorage.setItem("breakDuration", formatTimer(getSeconds(breakTime.value + ":00")));

        window.location.href = '../index.html';
    });
}