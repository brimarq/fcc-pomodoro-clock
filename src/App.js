import React, { Component } from 'react';
import './App.css';

const defaultClockState = {
  breakLength: 5,
  sessionLength: 25, 
  breakTimer: new Date(Date.UTC(1970, 0, 1, 0, 5, 0)),
  sessionTimer: new Date(Date.UTC(1970, 0, 1, 0, 25, 0)),
  isSession: true,
  isTimerRunning: false,
  countdown: null,
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
        Timer
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
      const amt = eleId.includes('-increment') ? 1 : -1;
      const setting = eleId.includes('break-') ? 'break' : 'session';
      const setTimer = (timer) => {
        timer.setTime(timer.getTime() + (amt * 60000));
        return timer;
      };
      const state = {
        'break': (prevState) => ({ 
          breakLength: prevState.breakLength + amt,
          breakTimer: setTimer(prevState.breakTimer)
        }), 
        'session': (prevState) => ({ 
          sessionLength: prevState.sessionLength + amt,
          sessionTimer: setTimer(prevState.sessionTimer)
        }) 
      };
      
      this.setState(state[setting]);
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
        />
        <SessionSetting 
          handleClick={this.handleClick}
          sessionLength={this.state.sessionLength}
        />
        <Timer 
          handleClick={this.handleClick}
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
