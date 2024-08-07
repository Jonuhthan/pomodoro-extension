chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.set({ isRunning: false, endTime: null });
});
  
function startTimer(duration) {
    const endTime = Date.now() + duration;
    chrome.storage.local.set({ isRunning: true, endTime: endTime });
    
    // Create an alarm to fire when the timer should end
    chrome.alarms.create('pomodoroTimer', { when: endTime });
}
  
function stopTimer() {
    // Clear the existing alarm
    chrome.alarms.clear('pomodoroTimer');
    chrome.storage.local.set({ isRunning: false, endTime: null });
}
  
// Listener for the alarm when it goes off
chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === 'pomodoroTimer') {
        chrome.storage.local.set({ isRunning: false, endTime: null });
        // Notify user or handle timer end
    }
});
  
// Listener for messages from the popup or other parts of the extension
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "start") {
        startTimer(request.duration);
    } else if (request.action === "stop") {
        stopTimer();
    } else if (request.action === "getStatus") {
        chrome.storage.local.get(["isRunning", "endTime"], (result) => {
            sendResponse(result);
        });
        return true;  // Keep the message channel open for sendResponse
    }
});
  