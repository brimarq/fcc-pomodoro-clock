import React from "react";
import store from "./store";
import "./TimeLeft.css";
// import { setBreakLength, setSessionLength } from "./actions";

const TimeLeft = () => {
  
  const { timer } = store.getState();
  //const timer = isBreak ? breakLength : sessionLength;
  const mmssFormat = (time) => {
    const timeInSec = Math.ceil(time / 1000);
    const padZero = (n) => n < 10 ? '0' + n : n;
    const mm = padZero(Math.floor(timeInSec / 60));
    const ss = padZero(timeInSec % 60);
    return mm + ':' + ss;
  };

  return <div id="time-left">{mmssFormat(timer)}</div>;
};

export default TimeLeft;