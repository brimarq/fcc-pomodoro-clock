import React, { PureComponent } from "react";
import store from "./store";
import "./TimerLength.css";
import { setBreakLength, setSessionLength } from "./actions";

class TimerLength extends PureComponent {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    const { setting, length } = this.props;
    const amt = e.target.id.includes('-increment') ? 1 : -1;
    const newLength = length + amt;
    const action = (payload) => setting === "break" ? setBreakLength(payload) : setSessionLength(payload);

    if (newLength > 60 || newLength < 1 ) return;
    return store.dispatch(action(newLength));
  }

  render() {
    const { setting, length, isRunning } = this.props;
    // const label = setting === "break" ? "Break Length" : "Session Length";
    
    return (
      <div id={setting + "-setting"}>
        <div className="setting-display">
          <div id={setting + "-label"}>{setting}</div>
          <span id={setting + "-length"}>{length + " min"}</span>
        </div>
        <div className="setting-buttons">
          <button id={setting + "-increment"} type="button" disabled={isRunning} onClick={this.handleClick}>&#9650;</button>
          <button id={setting + "-decrement"} type="button" disabled={isRunning} onClick={this.handleClick}>&#9660;</button>
        </div>
        
        
        
        
      </div>
    );
  }
}

export default TimerLength;