import React, { PureComponent } from "react";
import "./TimerSettings.css";
import TimerLength from "./TimerLength";

class TimerSettings extends PureComponent {

  render() {
    const { isRunning, sessionLength, breakLength } = this.props;
    
    return (
      <div id="timer-settings">
        <TimerLength 
          setting="break" 
          length={breakLength}  
          isRunning={isRunning}  
        />
        <TimerLength 
          setting="session" 
          length={sessionLength}  
          isRunning={isRunning} 
        />
      </div>
    );
  }
}

export default TimerSettings;