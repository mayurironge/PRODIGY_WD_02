let isRunning = false;
let startTime;
let lapStartTime;
let lapCounter = 1;

function startStop() {
    const startStopButton = document.getElementById("startStop");
    if (!isRunning) {
        startStopButton.textContent = "Stop";
        isRunning = true;
        startTime = new Date() - (lapStartTime || 0);
        lapStartTime = 0;
        update();
    } else {
        startStopButton.textContent = "Start";
        isRunning = false;
        lapStartTime = new Date() - startTime;
    }
}

function reset() {
    if (!isRunning) {
        document.getElementById("display").textContent = "00:00:00";
        lapCounter = 1;
        document.getElementById("laps").innerHTML = "";
        lapStartTime = 0;
    }
}

function lap() {
    if (isRunning) {
        const lapTime = new Date() - startTime;
        const lapList = document.getElementById("laps");
        const lapItem = document.createElement("li");
        lapItem.textContent = `Lap ${lapCounter}: ${formatTime(lapTime)}`;
        lapList.appendChild(lapItem);
        lapCounter++;
    }
}

function update() {
    if (isRunning) {
        const currentTime = new Date() - startTime;
        document.getElementById("display").textContent = formatTime(currentTime);
        setTimeout(update, 10);
    }
}

function formatTime(time) {
    const date = new Date(time);
    const hours = date.getUTCHours().toString().padStart(2, "0");
    const minutes = date.getUTCMinutes().toString().padStart(2, "0");
    const seconds = date.getUTCSeconds().toString().padStart(2, "0");
    const milliseconds = Math.floor(date.getUTCMilliseconds() / 10).toString().padStart(2, "0");
    return `${hours}:${minutes}:${seconds}.${milliseconds}`;
}
