import React, { PureComponent } from "react";
import "./TimerControls.css";

class TimerControls extends PureComponent {
  render() {
    const { handleTimerControl, isRunning } = this.props;
    const startStopLabel = isRunning ? "PAUSE" : "START";
    return (
      <div id="timer-controls">
       <button id="start_stop" type="button" onClick={handleTimerControl}>{startStopLabel}</button>
       <button id="reset" type="button" onClick={handleTimerControl}>RESET</button>
     </div>
    );
  }
}

export default TimerControls;