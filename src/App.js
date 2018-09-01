import React, { Component } from 'react';
import './App.css';
// const defaultBreakMs = 5 * 60000, defaultSessionMs = 25 * 60000;
// let breakTimer = new Date(defaultBreakMs);
// let sessionTimer = new Date(defaultSessionMs);

// New Date obj as timer, set to default sessionLength in ms (60000 ms = 1 m) past Unix Epoch time.
// const timer = new Date(25 * 60000);
// const timer = new Date(0);

// const updateTimer = (timer, minutes, fromZero = false) => {
//   if (fromZero) {
//     timer.setTime(minutes * 60000);
//   } else {
//     timer.setTime(timer.getTime() + (minutes * 60000));
//   }
//   return timer;
// };

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
        <div id="timer-label">{this.props.timerLabel}</div>
        <div id="time-left">{this.props.timeLeft}</div>
        <button id="start-stop" onClick={this.props.handleClick}>START/STOP</button>
        <button id="reset" onClick={this.props.handleClick}>RESET</button>
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

    const updateTimeLeft = () => {
      const timer = this.state.timer; // timer in seconds
      const minutes = Math.floor(timer / 60);
      const seconds = timer % 60;
      // Pad single-digit nums with 0 to keep to the mm:ss format.
      const padZero = (num) => num < 10 ? '0' + num : num;
      // mm:ss format string
      const mmss = padZero(minutes) + ':' + padZero(seconds);
      this.setState({timeLeft: mmss});
    };


    // const updateTimer = (timer, minutes, fromZero = false) => {
    //   if (fromZero) {
    //     timer.setTime(minutes * 60000);
    //   } else {
    //     timer.setTime(timer.getTime() + (minutes * 60000));
    //   }
    //   return timer;
    // };

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
    } else if (eleId === "start-stop") {
      
      const stopTimer = () => {
        clearInterval(this.timerID); 
        this.setState({isTimerRunning: false});
      };

      const startTimer = () => {
        const countdown = () => {
          // If timer is at 0, set the new timer and appropriate states. Otherwise, count down the current timer.
          if (!this.state.timer) {
            this.setState((prevState) => ({
                isTimerRunning: true,
                timer: prevState.isBreak ? prevState.sessionLength * 60 : prevState.breakLength * 60,
                isBreak: !prevState.isBreak,
                timerLabel: prevState.isBreak ? "Session" : "Break"
              }), () => updateTimeLeft()
            );
          } else {
            this.setState((prevState) => ({
                isTimerRunning: true,
                timer: prevState.timer - 1
              }), () => updateTimeLeft() 
            );
          }
        };

        this.timerID = setInterval(countdown, 1000);
      };

      if (this.state.isTimerRunning) {
        stopTimer();
      } else {
        startTimer();
      }
    
    // HANDLER FOR RESET
    } else {
      // Stop timer if clicked while timer is running.
      if (this.timerID) clearInterval(this.timerID);
      // Reset back to defaultClockState
      this.setState(defaultClockState);
    }
    
  } // END handleClick()

  render() {
    return(
      <div id="pomodoro-clock">
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
