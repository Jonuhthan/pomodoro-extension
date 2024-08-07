if (document.getElementById("settingsIdentifier")) {
    const submitButton = document.getElementById("submitButton");

    submitButton.addEventListener("click", () => {
        let pomodoroTime = document.getElementById("pomodoroTime");
        // update to include breakTime

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
            const savedDuration = localStorage.getItem('timerDuration');
            if (savedDuration) {
                pomodoroTime.value = Number(savedDuration.split(":")[0]);
            } else {
                pomodoroTime.value = 25;
            }
        }

        // update timer duration and redirect user back to home page
        localStorage.setItem("timerDuration", formatTimer(getSeconds(pomodoroTime.value + ":00")));
        window.location.href = '../index.html';
    });
}