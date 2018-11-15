import React from "react";
import store from "./store";
import "./TimerDisplay.css";

const TimerDisplay = () => {
  
  const { timer, isBreak } = store.getState();
  const timerLabel = isBreak ? "Break" : "Session";
  const mmssFormat = (time) => {
    //const timeInSec = Math.ceil(time / 1000);
    const padZero = (n) => n < 10 ? '0' + n : n;
    const mm = padZero(Math.floor(time / 60));
    const ss = padZero(time % 60);
    return mm + ':' + ss;
  };
  const mmss = mmssFormat(timer);

  return (
    <div id="timer-display">
      <div id="timer-label">{timerLabel}</div>
      <div id="time-left">{mmss}</div>
    </div>
  );
};

export default TimerDisplay;