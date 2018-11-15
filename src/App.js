import React, { Component } from 'react';
import './App.css';
import store from "./store";
// import TimerSetting from "./TimerSetting";
import Timer from "./Timer";
import TimeRing from "./TimeRing";

class App extends Component {
  render() {
    //const { isBreak, isRunning, timer, breakLength, sessionLength } = store.getState();
    return (
      <div className="App">
        <header className="App-header">Header</header>
        <main className="App-main">
          <div className="pomodoro-clock">
            <Timer {...store.getState()} />
            
          </div>
        </main>
        <footer className="App-footer">Footer</footer>
      </div>
    );
  }
}
export default App;
