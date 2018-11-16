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
    // const { isBreak, isRunning } = this.props;
    
    return (
      <div id="timer">
        <div id="time-ring-container">
          <TimerCanvas size="300" {...this.props} />
          <TimerDisplay />
        </div>
        
        <TimerSettings isRunning={this.props.isRunning} sessionLength={this.props.sessionLength} breakLength={this.props.breakLength}/>
        
        <TimerControls isRunning={this.props.isRunning} handleTimerControl={this.handleTimerControl}/>
        <audio id="beep" src="https://freesound.org/data/previews/250/250629_4486188-lq.mp3" type="audio/mpeg" ref={this.audioElement}></audio>
        
      </div>
    );
  }
}


export default Timer;