import React, { Component } from 'react';
import './App.css';

const defaultClockState = {
  breakLength: 5,
  sessionLength: 25, 
  timer: 25 * 60,
  isBreak: false,
  isTimerRunning: false,
  timerLabel: "Session",
  timeLeft: "25:00"
};

class BreakSetting extends Component {
  render() {
    return(
      <div id="break-setting">
        <span id="break-label">Break Length</span>
        <button id="break-decrement" onClick={this.props.handleClick}>DOWN</button>
        <span id="break-length">{this.props.breakLength}</span>
        <button id="break-increment" onClick={this.props.handleClick}>UP</button>
      </div>
    );
  }
}

class SessionSetting extends Component {
  render() {
    return(
      <div id="session-setting">
        <span id="session-label">Session Length</span>
        <button id="session-decrement" onClick={this.props.handleClick}>DOWN</button>
        <span id="session-length">{this.props.sessionLength}</span>
        <button id="session-increment" onClick={this.props.handleClick}>UP</button>
      </div>
    );
  }
}

class Timer extends Component {
  render() {
    return(
      <div id="timer">
        <div id="timer-label">{this.props.timerLabel}</div>
        <div id="time-left">{this.props.timeLeft}</div>
        <button id="start_stop" onClick={this.props.handleClick}>START/STOP</button>
        <button id="reset" onClick={this.props.handleClick}>RESET</button>
      </div>
    );
  }
}

class PomodoroClock extends Component {
  constructor(props) {
    super(props);
    this.state = defaultClockState;
    this.audioElement = React.createRef();
    this.canvas = React.createRef();
    this.handleClick = this.handleClick.bind(this);
    this.drawTimeRing = this.drawTimeRing.bind(this);
  }

  // 0 deg is at right, and deg increase clockwise
  drawTimeRing(time, isAnimated = false) {
    
    const canvas = this.canvas.current;
    const ctx = canvas.getContext("2d");

    const drawRing = (time) => {

      const arc = {
        // Set circle origin coordinate to center of canvas
        x: canvas.width / 2, 
        y: canvas.height / 2, 
        // radius as percentage of half of height
        r: canvas.height / 2 * 0.90,
        rads: {
          fullCircle: Math.PI * 2,
          qtrCircle: Math.PI / 2,
          // radians in 1/60 of a circle for seconds
          perSec: Math.PI * 2 / 60,
          // radians in 1ms
          perMs: Math.PI * 2 / 60 * 0.001,
        },
        rotate: function(radians) { return radians - this.rads.qtrCircle; },
        get start() {return this.rotate(0);},
        get end() {return !time ? this.rotate(this.rads.fullCircle) : this.rotate(time * this.rads.perMs);}, 
      };

      const drawArc = (x, y, r, start, end, isCCW, lineW, color) => {
        ctx.beginPath();
        ctx.arc(x, y, r, start, end, isCCW);
        ctx.lineWidth = lineW;
        ctx.strokeStyle = color;
        ctx.stroke();
      };

      const drawText = (text) => {
        
        ctx.font = '2em Arial, Helvetica, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(text, arc.x, arc.y);
      };

      // Clear canvas first
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // Time expired arc
      drawArc(arc.x, arc.y, arc.r, arc.start, arc.end, true, 20, "#bbb");
      // Time remaining arc
      drawArc(arc.x, arc.y, arc.r, arc.start, arc.end, false, 20, "lime");
      drawText(this.state.timeLeft);
    };

    const animateRing = () => {
      const animationLength = 1000; // time in ms
      let startTime = -1;
  
      const doAnimation = (timestamp) => {
        let progress = 0;
        
        if (startTime < 0) {
          // Set startTime as the beginning of the actual animation call
          startTime = timestamp;
        } else {
          // progress in ms from startTime
          progress = timestamp - startTime;
        }

        // Draw ring with end angle as time - progress
        drawRing(time - progress); 

        // Only animate if the progress (in ms) is less than 1 second.
        if (progress < animationLength) {
          this.AnimReqID = requestAnimationFrame(doAnimation);
        }
      };

      this.AnimReqID = requestAnimationFrame(doAnimation);
    };
    
    if (isAnimated) {
      animateRing();
    } else {
      drawRing(time);
    }

  } // END drawRing()

  componentDidMount() {
    console.log(this.state.timer);
    this.drawTimeRing(this.state.timer % 60);
  }

  handleClick(e) {
    const eleId = e.target.id;

    const updateTimeLeft = (isAnimated = false) => {
      const timer = this.state.timer; // timer in seconds
      const minutes = Math.floor(timer / 60);
      const seconds = timer % 60;
      // Pad single-digit nums with 0 to keep to the mm:ss format.
      const padZero = (num) => num < 10 ? '0' + num : num;
      // mm:ss format string
      const mmss = padZero(minutes) + ':' + padZero(seconds);
      this.setState({timeLeft: mmss}, this.drawTimeRing(seconds * 1000, isAnimated));
    };
    
    // HANDLER FOR BREAK/SESSION SETTINGS
    if (eleId.includes('-increment') || eleId.includes('-decrement')) {
      // Disallow setting changes if timer is running by returning early.
      if (this.state.isTimerRunning) return;
      // Amount to increase/decrease (in minutes)
      const amt = eleId.includes('-increment') ? 1 : -1;
      // Which setting was clicked? Used to choose appropriate new state.
      const setting = eleId.includes('break-') ? 'break' : 'session';
      // Limiter for break/session settings length
      const isAtLimit = (num) => {
        if (num + amt < 1 || num + amt > 60) {return true;}
        else {return false;}
      };
      
      // Options for the newState to be set
      const newState = {
        'break': (prevState) => ({ 
          breakLength: isAtLimit(prevState.breakLength) // breakLength at limit? Don't update.
            ? prevState.breakLength 
            : prevState.breakLength + amt,
          timer: prevState.isBreak // Break timer displayed? OK to change timer.
            ? isAtLimit(prevState.breakLength) // breakLength at limit? Don't update timer.
              ? prevState.timer 
              : prevState.timer + amt * 60 // Update the timer in seconds
            : prevState.timer // Session timer displayed? Don't change timer.
        }), 
        'session': (prevState) => ({ 
          sessionLength: isAtLimit(prevState.sessionLength) // sessionLength at limit? Don't update.
            ? prevState.sessionLength 
            : prevState.sessionLength + amt,
          timer: !prevState.isBreak // Session timer displayed? OK to change timer.
            ? isAtLimit(prevState.sessionLength) // sessionLength at limit? Don't update timer.
              ? prevState.timer 
              : prevState.timer + amt * 60 // Update the timer in seconds
            : prevState.timer // Break timer displayed? Don't change timer.
        }) 
      };
      
      // Set the state depending upon which setting was clicked, then update timeLeft to match current timer.
      this.setState(newState[setting], () => updateTimeLeft());
    
    // HANDLER FOR START/STOP
    } else if (eleId === "start_stop") {
      
      const stopTimer = () => {
        clearInterval(this.timerID); 
        cancelAnimationFrame(this.AnimReqID);
        this.setState({isTimerRunning: false});
      };

      const startTimer = () => {
        const countdown = () => {
          // If timer is at 0, set the new timer and appropriate states. Otherwise, count down the current timer.
          if (!this.state.timer) {
            this.audioElement.current.play();
            this.setState((prevState) => ({
                isTimerRunning: true,
                timer: prevState.isBreak ? prevState.sessionLength * 60 : prevState.breakLength * 60,
                isBreak: !prevState.isBreak,
                timerLabel: prevState.isBreak ? "Session" : "Break"
              }), () => updateTimeLeft(true)
            );
          } else {
            this.setState((prevState) => ({
                isTimerRunning: true,
                timer: prevState.timer - 1
              }), () => updateTimeLeft(true) 
            );
          }
          
        };

        this.timerID = setInterval(countdown, 1000);
      };

      // Start/stop timer
      this.state.isTimerRunning ? stopTimer() : startTimer();

    // HANDLER FOR RESET
    } else {
      // Stop timer if clicked while timer is running.
      if (this.timerID) clearInterval(this.timerID);
      if (this.AnimReqID) cancelAnimationFrame(this.AnimReqID);
      // Stop and reset the beep audio
      this.audioElement.current.pause();
      this.audioElement.current.currentTime = 0;
      // Reset back to defaultClockState
      this.setState(defaultClockState);
    }
    
  } // END handleClick()

  render() {
    
    return(
      <div id="pomodoro-clock">
        <canvas id="canvas" width="200" height="200" style={{border: "1px solid #d3d3d3", backgroundColor: "rgba(0, 0, 0, 0)"}} ref={this.canvas}></canvas>
        <BreakSetting 
          handleClick={this.handleClick}
          breakLength={this.state.breakLength}
        />
        <SessionSetting 
          handleClick={this.handleClick}
          sessionLength={this.state.sessionLength}
        />
        <Timer 
          handleClick={this.handleClick}
          timerLabel={this.state.timerLabel} 
          timeLeft={this.state.timeLeft}
        />
        <audio id="beep" src="https://freesound.org/data/previews/250/250629_4486188-lq.mp3" type="audio/mpeg" ref={this.audioElement}></audio>
        
      </div>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">Header</header>
        <main className="App-main">
          <PomodoroClock />
        </main>
        <footer className="App-footer">Footer</footer>
      </div>
    );
  }
}

export default App;
