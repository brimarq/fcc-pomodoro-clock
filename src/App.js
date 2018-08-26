import React, { Component } from 'react';
import './App.css';

const defaultClockState = {
  breakLength: 5,
  sessionLength: 25, 
  isSession: true,
  isTimerRunning: false,
  countdown: null,
};

class BreakSetting extends Component {
  render() {
    return(
      <div id="break-setting">
        BreakSetting
      </div>
    );
  }
}

class SessionSetting extends Component {
  render() {
    return(
      <div id="session-setting">
        SessionSetting
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

  handleClick() {
    return;
  }

  render() {
    return(
      <div id="pomodoro-clock">
        <BreakSetting />
        <SessionSetting />
        <Timer />
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
