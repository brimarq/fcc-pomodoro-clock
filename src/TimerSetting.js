import React, { PureComponent } from "react";
import store from "./store";
import "./TimerSetting.css";
import { setBreakLength, setSessionLength } from "./actions";

class TimerSetting extends PureComponent {
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
    const { setting, label, length, isRunning } = this.props;
    
    return (
      <div id={setting + "-setting"}>
        <span id={setting + "-label"}>{label}</span>
        <button id={setting + "-decrement"} type="button" disabled={isRunning} onClick={this.handleClick}>&#9660;</button>
        <span id={setting + "-length"}>{length}</span>
        <button id={setting + "-increment"} type="button" disabled={isRunning} onClick={this.handleClick}>&#9650;</button>
      </div>
    );
  }
}

export default TimerSetting;