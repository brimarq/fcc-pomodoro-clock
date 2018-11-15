import React from "react";
//import store from "./store";
import "./TimerControls.css";

const TimerControls = ({isRunning, handleTimerControl}) => {
  
  //const { isRunning } = store.getState();
  const startStopLabel = isRunning ? "STOP" : "START";
  

  return (
    <div id="timer-controls">
      <button id="start_stop" type="button" onClick={handleTimerControl}>{startStopLabel}</button>
      <button id="reset" type="button" onClick={handleTimerControl}>RESET</button>
    </div>
  );
};

export default TimerControls;