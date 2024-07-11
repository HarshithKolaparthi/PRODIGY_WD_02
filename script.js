let startTime;
let updatedTime;
let difference = 0;
let timerInterval;
let running = false;
let lapCounter = 1;

const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const laps = document.getElementById('laps');

function startStop() {
    if (!running) {
        startTime = new Date().getTime() - difference;
        timerInterval = setInterval(updateTime, 1000);
        startStopBtn.textContent = 'Stop';
        running = true;
    } else {
        clearInterval(timerInterval);
        startStopBtn.textContent = 'Start';
        running = false;
    }
}

function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    
    const hours = Math.floor(difference / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    
    display.textContent = 
        (hours < 10 ? "0" + hours : hours) + ":" + 
        (minutes < 10 ? "0" + minutes : minutes) + ":" + 
        (seconds < 10 ? "0" + seconds : seconds);
}

function reset() {
    clearInterval(timerInterval);
    display.textContent = '00:00:00';
    startStopBtn.textContent = 'Start';
    running = false;
    difference = 0;
    laps.innerHTML = '';
    lapCounter = 1;
}

function lap() {
    if (running) {
        const lapTime = display.textContent;
        const li = document.createElement('li');
        li.textContent = `Lap ${lapCounter}: ${lapTime}`;
        laps.appendChild(li);
        lapCounter++;
    }
}

startStopBtn.addEventListener('click', startStop);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', lap);
