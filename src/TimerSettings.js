import React, { PureComponent } from "react";
import "./TimerSettings.css";
import TimerLength from "./TimerLength";

class TimerSettings extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const { isRunning, sessionLength, breakLength } = this.props;
    
    return (
      <div id="timer-settings">
        <TimerLength 
          setting="break" 
          label="Break Length" 
          length={breakLength}  
          isRunning={isRunning}  
        />
        <TimerLength 
          setting="session" 
          label="Session Length" 
          length={sessionLength}  
          isRunning={isRunning} 
        />
      </div>
    );
  }
}

export default TimerSettings;