// import React, { Component } from 'react';
import React from 'react';
import './App.css';
import TimerSetting from "./TimerSetting"
import Timer from "./Timer"

// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <header className="App-header">Header</header>
//         <main className="App-main">
//         Main
//         </main>
//         <footer className="App-footer">Footer</footer>
//       </div>
//     );
//   }
// }

const App = () => {
  return (
    <div className="App">
      <header className="App-header">Header</header>
      <main className="App-main">
        <div className="pomodoro-clock">
          <TimerSetting setting="break" />
          <TimerSetting setting="session" />
          <Timer />
        </div>
      </main>
      <footer className="App-footer">Footer</footer>
    </div>
  );
}

export default App;
