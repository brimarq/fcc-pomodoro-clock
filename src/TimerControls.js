import React, { PureComponent } from "react";
import "./TimerControls.css";

class TimerControls extends PureComponent {
  render() {
    const { handleTimerControl, isRunning } = this.props;
    const startStopLabel = isRunning ? "PAUSE" : "START";
    return (
      <div id="timer-controls">
       <button id="start_stop" className="btn-controls btn-rubber-pad" type="button" onClick={handleTimerControl}>{startStopLabel}</button>
       <button id="reset" className="btn-controls btn-rubber-pad" type="button" onClick={handleTimerControl}>RESET</button>
     </div>
    );
  }
}

export default TimerControls;