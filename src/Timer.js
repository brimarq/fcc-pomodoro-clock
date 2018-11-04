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
    const beep = audioElement.current;

    const startTimer = () => {
      
      const countdown = () => {
        const time = store.getState().timer;
        const newTime = time - 1;
        if (!time) {
          beep.play();
          store.dispatch(toggleTimer());
        } else {
          store.dispatch(tickTimer(newTime));
          
        }
        
        if (!newTime) beep.play();
      };

      window.timerID = setInterval(countdown, 1000);
    };

    isRunning ? clearInterval(window.timerID) : startTimer();
  };

  const handleClick = (e) => {
    const clickedId = e.target.id;
    const beep = audioElement.current;
    const toggle = (bool) => {
      store.dispatch(setIsRunning(bool));
      handleTimer();

    };
    const reset = () => {
      if (isRunning) clearInterval(window.timerID);
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