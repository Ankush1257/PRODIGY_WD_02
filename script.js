let timer;
let isRunning = false;
let startTime;
let lapTimes = [];

function startStopwatch() {
    if (!isRunning) {
        isRunning = true;
        startTime = Date.now() - (lapTimes.length > 0 ? lapTimes[lapTimes.length - 1].time : 0);
        timer = setInterval(updateDisplay, 10);
        document.querySelector('button:nth-child(1)').textContent = 'Pause';
    } else {
        isRunning = false;
        clearInterval(timer);
        document.querySelector('button:nth-child(1)').textContent = 'Resume';
    }
}

function pauseStopwatch() {
    if (isRunning) {
        isRunning = false;
        clearInterval(timer);
        document.querySelector('button:nth-child(1)').textContent = 'Resume';
    }
}

function resetStopwatch() {
    isRunning = false;
    clearInterval(timer);
    document.querySelector('button:nth-child(1)').textContent = 'Start';
    lapTimes = [];
    updateDisplay();
}

function lapTime() {
    if (isRunning) {
        const lap = {
            time: Date.now() - startTime,
        };
        lapTimes.push(lap);
        updateLapList();
    }
}

function updateDisplay() {
    const elapsedTime = Date.now() - startTime;
    const formattedTime = formatTime(elapsedTime);
    document.getElementById('display').textContent = formattedTime;
}

function formatTime(milliseconds) {
    const date = new Date(milliseconds);
    const minutes = date.getUTCMinutes();
    const seconds = date.getUTCSeconds();
    const millisecondsPart = Math.floor(date.getUTCMilliseconds() / 10);

    return (
        String(minutes).padStart(2, '0') + ':' +
        String(seconds).padStart(2, '0') + ':' +
        String(millisecondsPart).padStart(2, '0')
    );
}

function updateLapList() {
    const lapList = document.getElementById('lapList');
    lapList.innerHTML = '';

    lapTimes.forEach((lap, index) => {
        const lapTime = formatTime(lap.time);
        const listItem = document.createElement('li');
        listItem.textContent = `Lap ${index + 1}: ${lapTime}`;
        lapList.appendChild(listItem);
    });
}
