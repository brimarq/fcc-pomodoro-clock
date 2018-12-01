import React, { PureComponent } from 'react';
import store from "./store";
import "./Timer.css";
// import anime from 'animejs'
import TimerCanvas from "./TimerCanvas";
import TimerDisplay from "./TimerDisplay";
import TimerControls from "./TimerControls";
import TimerSettings from "./TimerSettings";

import { tickTimer, toggleTimer, setIsRunning, resetTimer } from "./actions";


class Timer extends PureComponent {
  constructor(props) {
    super(props);
    this.audioElement = React.createRef();
    this.handleTimer = this.handleTimer.bind(this);
    this.handleTimerControl = this.handleTimerControl.bind(this);
  }

  handleTimer() {
    const { isRunning } = this.props;
    const beep = this.audioElement.current;
    
    const startTimer = () => {

      const countdown = (time = store.getState().timer) => {
        const newTime = time - 1;
        if (!time) {
          //beep.play();
          store.dispatch(toggleTimer());
        } else {
          store.dispatch(tickTimer(newTime));
          if (!newTime) beep.play();
        }
      };

      this.timerID = setInterval(countdown, 1000);
    };

    isRunning ? clearInterval(this.timerID) : startTimer();
  }

  handleTimerControl(e) {
    const clickedId = e.target.id;
    const beep = this.audioElement.current;
    const toggle = (bool) => {
      store.dispatch(setIsRunning(bool));
      this.handleTimer();
    };
    const reset = () => {
      if (this.props.isRunning) clearInterval(this.timerID);
      beep.pause();
      beep.currentTime = 0;
      store.dispatch(resetTimer());
      
    };
    clickedId === "reset" ? reset() : toggle(!this.props.isRunning);
  }


  render() {
    const { isBreak } = this.props;
    const tfTextColor = "hsla(0, 0%, 100%, 0.8)";
    const tfBottomText = isBreak ? "BREAK" : "SESSION";
    
    return (
      <div id="timer">
        <div id="timer-face">
          <svg id="timer-face-text" viewBox="0 0 250 250" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <path id="topArc" d="M25 125 a 100 100, 0 0,1 200 0"/>
              <path id="bottomArc" d="M25 125 a 100 100, 0 0,0 200 0"/>
            </defs>
            <text fill={tfTextColor} textAnchor="middle" dy="0.75em" style={{letterSpacing: "0.15em"}}>
              <textPath xlinkHref="#topArc" startOffset="50%" method="stretch" spacing="auto">POMODORO CLOCK</textPath>
            </text>
            <text fill={tfTextColor} style={{textAnchor: "middle", letterSpacing: "0.15em"}}>
              <textPath xlinkHref="#bottomArc" startOffset="50%" method="stretch" spacing="auto">{tfBottomText}</textPath>
            </text>
          
                            
            {/* <circle id="tfCircle" cx="50%" cy="50%" r="75" fill="none" stroke="red" stroke-width="2" pathLength="360"/>
            <text fill="white">
              <textPath xlinkHref="#tfCircle" startOffset="75%">POMODORO CLOCK</textPath>
            </text> */}
          

          </svg>
          <TimerCanvas size="250" {...this.props} />
          <TimerDisplay />
        </div>
        <div id="timer-control-panel">
          <TimerSettings isRunning={this.props.isRunning} sessionLength={this.props.sessionLength} breakLength={this.props.breakLength}/>
          <TimerControls isRunning={this.props.isRunning} handleTimerControl={this.handleTimerControl}/>
        </div>
        
        
        <audio id="beep" src="https://freesound.org/data/previews/250/250629_4486188-lq.mp3" type="audio/mpeg" ref={this.audioElement}></audio>
      </div>
    );
  }
}


export default Timer;