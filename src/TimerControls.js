import React, { PureComponent } from "react";
import "./TimerControls.css";

class TimerControls extends PureComponent {
  render() {
    const { handleTimerControl, isRunning } = this.props;
    const startStopLabel = isRunning ? "PAUSE" : "START";
    return (
      <div id="timer-controls">
       <button id="start_stop" className="btn-controls" type="button" onClick={handleTimerControl} style={ isRunning ? {"--rubber-pad-color": "hsla(60, 100%, 75%, 1)"} : {"--rubber-pad-color": "hsla(120, 100%, 75%, 1)"}}>{startStopLabel}</button>
       <button id="reset" className="btn-controls" type="button" onClick={handleTimerControl}>RESET</button>
     </div>
    );
  }
}

export default TimerControls;