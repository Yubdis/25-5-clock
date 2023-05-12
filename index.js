// buttons
const breakDecrementButton = document.getElementById('break-decrement');
const breakIncrementButton = document.getElementById('break-increment');
const sessionDecrementButton = document.getElementById('session-decrement');
const sessionIncrementButton = document.getElementById('session-increment');
const startStopButton = document.getElementById('start_stop');
const resetButton = document.getElementById('reset');

// displays
const timerMinutes = document.getElementById('timer-minutes');
const timerSeconds = document.getElementById('timer-seconds');
const timerLabel = document.getElementById('timer-label');
let sessionLengthDisplay = document.getElementById('session-length');
let breakLengthDisplay = document.getElementById('break-length');
let timeLeftDisplay = document.getElementById('time-left');

// default starting times in seconds
let breakSessionLength = 300;
let sessionLength = 1500;
const TWENTYFIVE_MINUTES = 1500;
const FIVE_MINUTES = 300;

// timer status'
let sessionStatus = true;
let breakStatus = false;
let timer;

const alarmAudio = document.getElementById('beep');


function updateTimerDisplay(length) {
  if(Math.floor(length / 60).toString().length === 1){
    timerMinutes.innerText = "0" + Math.floor(length / 60);
  } else {
    timerMinutes.innerText = Math.floor(length / 60);
  }
  if((length % 60).toString().length === 1) {
    timerSeconds.innerText = "0" + length % 60;
  } else {
    timerSeconds.innerText = length % 60;
  }
}

function reset() {
  clearInterval(timer);
  sessionStatus = true;
  breakStatus = false;
  sessionLength = TWENTYFIVE_MINUTES;
  breakSessionLength = FIVE_MINUTES;
  sessionLengthDisplay.innerText = TWENTYFIVE_MINUTES / 60;
  breakLengthDisplay.innerText = FIVE_MINUTES / 60;
  timerMinutes.innerText = sessionLength / 60;
  timerSeconds.innerText = "00";
  timerLabel.innerText = "Timer";
}

function startBreak() {
  clearInterval(timer);
  sessionStatus = false;
  breakStatus = true;
  timerLabel.innerText = "Break";

  timer = setInterval(() => {
    breakSessionLength -= 1;
    updateTimerDisplay(breakSessionLength);

    if(breakSessionLength < 0) {
      sessionLength = parseInt(sessionLengthDisplay.innerText) * 60;
      updateTimerDisplay(sessionLength)
      alarmAudio.play();
      startSession();
    }
  }, 1000)
}

function startSession () {
  clearInterval(timer);
  sessionStatus = true;
  breakStatus = false;
  timerLabel.innerText = "Session";

  timer = setInterval(() => {
    sessionLength -= 1;
    updateTimerDisplay(sessionLength)

    if (sessionLength < 0) {
      breakSessionLength = parseInt(breakLengthDisplay.innerText) * 60;
      updateTimerDisplay(breakSessionLength)
      alarmAudio.play();
      startBreak();
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(timer)
  timerStatus = "stopped";
}
startStopButton.addEventListener("click", () => {
  if (sessionStatus){
    startSession();
  } else {
    startBreak();
  }
  if (timerStatus === "start" || timerStatus === "stopped"){
    timerStatus = "counting";

  } else if (timerStatus === "counting") {
    timerStatus = "stopped";
    clearInterval(timer)
  }
})

resetButton.addEventListener("click", () => {
  reset();
  stopTimer();
  alarmAudio.pause();
  alarmAudio.load();
})

sessionDecrementButton.addEventListener("click", () => {
  if(sessionLength - 60 === 0){
    return;
  }
  sessionLength -= 60;
  sessionLengthDisplay.innerText = sessionLength / 60;
  if (sessionStatus){
    timerMinutes.innerText = sessionLength / 60;
  }
})

sessionIncrementButton.addEventListener("click", () => {
  if (sessionLength >= 3600) {
    return;
  }
  sessionLength += 60;
  sessionLengthDisplay.innerText = sessionLength / 60;
  if (sessionStatus){
    timerMinutes.innerText = sessionLength / 60;
  }
})

breakDecrementButton.addEventListener("click", () => {
  if(breakSessionLength - 60 === 0){
    return;
  }
  breakSessionLength -= 60;
  breakLengthDisplay.innerText = breakSessionLength / 60;
})

breakIncrementButton.addEventListener("click", () => {
  if (breakSessionLength >= 3600) {
    return;
  }
  breakSessionLength += 60;
  breakLengthDisplay.innerText = breakSessionLength / 60;
})
