import React, { PureComponent } from "react";
import store from "./store";
import "./TimerSetting.css";
import { setBreakLength, setSessionLength } from "./actions";

const TimerSetting = ({setting}) => {
  
  const { breakLength, sessionLength, isRunning } = store.getState();
  const length = setting === "break" ? breakLength : sessionLength;
  const msPerMin = 60000;
  const minutes = length / msPerMin;
  const label = setting === "break" ? "Break Length" : "Session Length";

  const handleClick = (e) => {
    const amt = e.target.id.includes('-increment') ? msPerMin : -msPerMin;
    const newLength = length + amt;
    const action = (payload) => setting === "break" ? setBreakLength(payload) : setSessionLength(payload);

    if (newLength > 60 * msPerMin || newLength < msPerMin ) return;
    return store.dispatch(action(newLength));
  };
  
  return (
    <div id={setting + "-setting"}>
      <span id={setting + "-label"}>{label}</span>
      <button id={setting + "-decrement"} type="button" disabled={isRunning} onClick={handleClick}>DOWN</button>
      <span id={setting + "-length"}>{minutes}</span>
      <button id={setting + "-increment"} type="button" disabled={isRunning} onClick={handleClick}>UP</button>
    </div>
  )
};

export default TimerSetting;