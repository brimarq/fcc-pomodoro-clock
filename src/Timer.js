import React from 'react';
import store from "./store";
import "./Timer.css";
import TimeRing from "./TimeRing";
import TimeLeft from "./TimeLeft";
import { tickTimer, toggleTimer, setIsRunning, resetTimer } from "./actions";

const Timer = () => {
  const { isBreak, isRunning, timer, breakLength, sessionLength } = store.getState();
  
  const timerLabel = isBreak ? "Break" : "Session";
  const btnToggleLabel = isRunning ? "STOP" : "START";
  let audioElement = React.createRef();

  const handleTimer = () => {
    
    const animateTimer = () => {
      //const animationLength = 10000; // time in ms
      const beep = audioElement.current;
      // Set clock here to track elapsed time
      let clock = timer;
      let startTime = -1;

      const doAnimation = (timestamp) => {
        let progress = 0;
        let countdown;
        
        if (startTime < 0) {
          // Set startTime as the beginning of the actual animation call
          startTime = timestamp;
          
        } else {
          // progress in ms from startTime
          progress = Math.floor(timestamp - startTime);
          countdown = clock - progress;
          
          
          // If countdown < 0, hold timer at 0 for 1 second, otherwise tickTimer
          if (countdown < 0) {
            console.log('countdown: ' + countdown);
            store.dispatch(tickTimer(0));
            beep.play();
            // after 1 sec hold at 0, toggle the timer, set new startTime and clock from new timer
            if (countdown < -1000) {
              store.dispatch(toggleTimer());
              startTime = -1;
              clock = store.getState().timer;
            }
            
          } else {
            // Dispatch the new time to the timer
            store.dispatch(tickTimer(countdown));
          }
        } 
        window.animReqID = requestAnimationFrame(doAnimation);
      };

      window.animReqID = requestAnimationFrame(doAnimation);
    };

    isRunning ? cancelAnimationFrame(window.animReqID) : animateTimer();

  };

  const handleClick = (e) => {
    const clickedId = e.target.id;
    const beep = audioElement.current;
    const toggle = (bool) => {
      store.dispatch(setIsRunning(bool));
      handleTimer();
      
      //console.log(beep.current.paused)
    };
    const reset = () => {
      if (isRunning) cancelAnimationFrame(window.animReqID);
      beep.pause();
      beep.currentTime = 0;
      store.dispatch(resetTimer());
    };
    clickedId === "reset" ? reset() : toggle(!isRunning);
  };

  
  
  return (
    <div id="timer">
      <TimeRing msLeft={timer} msTotal={isBreak ? breakLength : sessionLength} />
      
      <div id="timer-label">{timerLabel}</div>
      <TimeLeft />
      <button id="start_stop" type="button" onClick={handleClick}>{btnToggleLabel}</button>
      <button id="reset" type="button" onClick={handleClick}>RESET</button>
      <audio id="beep" src="https://freesound.org/data/previews/250/250629_4486188-lq.mp3" type="audio/mpeg" ref={audioElement}></audio>
    </div>
  );
};

export default Timer;