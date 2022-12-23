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

// default starting times
let breakSessionLength = 5 * 60;
let sessionLength = 25 * 60;
const TWENTYFIVE_MINUTES = 25 * 60;
const FIVE_MINUTES = 5 *60;

// timer status'
let sessionStatus = true;
let sessionTimer;
let breakTimer;
let timerStatus = "start";
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
  sessionStatus = true;
  sessionLength = TWENTYFIVE_MINUTES;
  breakSessionLength = FIVE_MINUTES;
  sessionLengthDisplay.innerText = TWENTYFIVE_MINUTES / 60;
  breakLengthDisplay.innerText = FIVE_MINUTES / 60;
  clearInterval(sessionTimer);
  clearInterval(breakTimer);
  timerMinutes.innerText = sessionLength / 60;
  timerSeconds.innerText = "00";
  timerLabel.innerText = "Timer";
}

function startBreak() {
  clearInterval(sessionTimer);
  sessionStatus = false;
  timerLabel.innerText = "Break";

  breakTimer = setInterval(() => {
    breakSessionLength -= 1;
    updateTimerDisplay(breakSessionLength);

    if(breakSessionLength < 0) {
      sessionLength = parseInt(sessionLengthDisplay.innerText) * 60;
      updateTimerDisplay(sessionLength)
      startSession();
    }
  }, 1000)
}

function startSession () {
  clearInterval(breakTimer);
  sessionStatus = true;
  timerLabel.innerText = "Session";

  sessionTimer = setInterval(() => {
    sessionLength -= 1;
    updateTimerDisplay(sessionLength)

    if (sessionLength < 0) {
      breakSessionLength = parseInt(breakLengthDisplay.innerText) * 60;
      updateTimerDisplay(breakSessionLength)
      startBreak();
      alarmAudio.play();
    }
  }, 1000);
}

startStopButton.addEventListener("click", () => {
  if (sessionStatus){
    startSession();
  } else {
    startBreak();
  }
  if (timerStatus === "start" || timerStatus === "stopped"){
    timerStatus = "counting";
    
  } else if (timerStatus === "counting"){
    timerStatus = "stopped";
    clearInterval(sessionTimer)
  }
})

resetButton.addEventListener("click", () => {
  reset();
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

