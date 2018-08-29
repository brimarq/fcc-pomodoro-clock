import React, { Component } from 'react';
import './App.css';
const defaultBreakMs = 5 * 60000, defaultSessionMs = 25 * 60000;
let breakTimer = new Date(defaultBreakMs);
let sessionTimer = new Date(defaultSessionMs);

// const getUTCmmss = () => {
//   const timer = this.state.isBreak ? breakTimer : sessionTimer;
//   const padZero = (num) => num < 10 ? '0' + num : num;
//   return padZero(timer.getUTCMinutes()) + ':' + padZero(timer.getUTCSeconds());
// };

// Add func for returning mm:ss string from timer
const getUTCmmss = (timer) => {
  const padZero = (num) => num < 10 ? '0' + num : num;
  return padZero(timer.getUTCMinutes()) + ':' + padZero(timer.getUTCSeconds());
};

// Adjust the timer with option to reset to zero first.
const setTimer = (timer, minutes, fromZero = false) => {
  let ms = minutes * 60000;
  if (fromZero) {
    timer.setTime(ms);
  } else {
    timer.setTime(timer.getTime() + ms);
  }
  return timer;
};

const defaultClockState = {
  breakLength: 5,
  sessionLength: 25, 
  // breakTimer: new Date(Date.UTC(1970, 0, 1, 0, 5, 0)),
  // sessionTimer: new Date(Date.UTC(1970, 0, 1, 0, 25, 0)),
  breakTimer: breakTimer,
  sessionTimer: sessionTimer,
  isBreak: false,
  isTimerRunning: false,
  countdown: null,
  timerLabel: "Session",
  timeLeft: getUTCmmss(sessionTimer)
};






// Add method for returning mm:ss string from Date objects
// Date.prototype.getUTCmmss = function() {
//   const padZero = (num) => num < 10 ? '0' + num : num;
//   return padZero(this.getUTCMinutes()) + ':' + padZero(this.getUTCSeconds());
// };

class BreakSetting extends Component {
  render() {
    return(
      <div id="break-setting">BreakSetting
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
        SessionSetting
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
        <div id="timer-label"></div>
        <div id="time-left">{getUTCmmss(breakTimer)}</div>
      </div>
    );
  }
}

class PomodoroClock extends Component {
  constructor(props) {
    super(props);
    this.state = defaultClockState;
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    const eleId = e.target.id;
    // HANDLER FOR BREAK/SESSION SETTINGS
    if (eleId.includes('-increment') || eleId.includes('-decrement')) {
      // Amount to increase/decrease (in minutes)
      const amt = eleId.includes('-increment') ? 1 : -1;
      // Which setting was clicked? Used to choose appropriate new state.
      const setting = eleId.includes('break-') ? 'break' : 'session';
      // const setTimer = (timer) => {
      //   // Adjust the timer by amt * 60000ms (60000ms = one minute)
      //   timer.setTime(timer.getTime() + (amt * 60000));
      //   return timer;
      // };
      // Options for the newState to be set
      const newState = {
        'break': (prevState) => ({ 
          breakLength: prevState.breakLength + amt,
          breakTimer: setTimer(prevState.breakTimer, amt),
          
        }), 
        'session': (prevState) => ({ 
          sessionLength: prevState.sessionLength + amt,
          sessionTimer: setTimer(prevState.sessionTimer, amt),
        }) 
      };
      
      // Set the state depending upon which button was clicked
      this.setState(newState[setting]);
    } else {
      return;
    }
  
  }

  render() {
    return(
      <div id="pomodoro-clock">
        <BreakSetting 
          handleClick={this.handleClick}
          breakLength={this.state.breakLength}
          breakTimer={this.state.breakTimer} 
          sessionTimer={this.state.sessionTimer}
        />
        <SessionSetting 
          handleClick={this.handleClick}
          sessionLength={this.state.sessionLength}
        />
        <Timer 
          handleClick={this.handleClick}
          breakTimer={this.state.breakTimer} 
          sessionTimer={this.state.sessionTimer}
          timeLeft={this.state.timeLeft}
        />
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
