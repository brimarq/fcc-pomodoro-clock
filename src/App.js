import React, { Component } from 'react';
import './App.css';
import store from "./store";
import Timer from "./Timer";

class App extends Component {
  render() {
    //const { isBreak, isRunning, timer, breakLength, sessionLength } = store.getState();
    return (
      <div className="App">
        <header className="App-header">
        <h1>Pomodoro Clock</h1>
        </header>
        <main className="App-main">
          <Timer {...store.getState()} />
        </main>
        <footer className="App-footer"></footer>
      </div>
    );
  }
}
export default App;
