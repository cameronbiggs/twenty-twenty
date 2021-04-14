// Timer Class
class Timer {
  activity = {
    WORKING: "working",
    RESTING: "resting",
  };
  paused = true;
  state;
  count;
  timer;

  constructor(workDuration, restDuration, displayM, displayS) {
    // Times
    this.workDuration = workDuration;
    this.restDuration = restDuration;
    // DOM Elements
    this.displayM = displayM;
    this.displayS = displayS;
    // States
    this.count = this.workDuration;
    this.state = this.activity.WORKING;
  }

  updateDisplay() {
    var mins = Math.floor(this.count / 60);
    mins = mins < 10 ? "0" + mins.toString() : mins;
    var secs = this.count - mins * 60;
    secs = secs < 10 ? "0" + secs.toString() : secs;

    this.displayM.innerHTML = mins;
    this.displayS.innerHTML = secs;
    document.title = `${mins}:${secs}`;
  }

  toggle(startBtn) {
    if (this.paused) {
      // Arrow function allows for preservation of this
      this.timer = setInterval(() => this.tick(), 1000);
      this.paused = false;
      startBtn.innerHTML = "Pause";
    } else {
      clearInterval(this.timer);
      this.paused = true;
      startBtn.innerHTML = "Start";
    }
  }

  stop() {
    clearInterval(this.timer);
    this.count = this.workDuration;
    this.updateDisplay();
    this.paused = true;
  }

  tick() {
    this.count--;

    if (this.count < 0) {
      if (this.state === this.activity.WORKING) {
        this.count = this.restDuration;
        this.state = this.activity.RESTING;
      } else {
        this.count = this.workDuration;
        this.state = this.activity.WORKING;
      }
    }

    this.updateDisplay();
  }
}

// Constants
const WORK_DURATION = 20 * 60;
const REST_DURATION = 20;

// Create timer
const m = document.getElementById("minText");
const s = document.getElementById("secText");
const t = new Timer(WORK_DURATION, REST_DURATION, m, s);

const startBtn = document.getElementById("startBtn");
startBtn.addEventListener("click", toggleTimer, false);

const stopBtn = document.getElementById("stopBtn");
stopBtn.addEventListener("click", stopTimer, false);

function toggleTimer() {
  t.toggle(startBtn);
}

function stopTimer() {
  t.stop();
}
