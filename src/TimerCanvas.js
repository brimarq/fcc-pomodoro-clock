import React, { PureComponent } from 'react';
import "./TimerCanvas.css";

// import store from "./store";
// import anime from 'animejs'

class TimerCanvas extends PureComponent {
  constructor(props) {
    super(props);
    this.canvas = React.createRef();
    this.drawTimeRing = this.drawTimeRing.bind(this);
  }

  componentDidMount() {
    this.drawTimeRing();
  }

  componentDidUpdate() {
    this.drawTimeRing();
  }

  drawTimeRing() {
    const { isBreak, isRunning, breakLength, sessionLength, timer } = this.props;
    
    // draw fn w/default
    const draw = (timeNow = timer * 1000) => {
      const totalTime = isBreak ? breakLength * 60000 : sessionLength * 60000;
      const canvas = this.canvas.current;
      const ctx = canvas.getContext("2d");

      // const hue = timeNow > 10000 
      //   ? isBreak ? 200 : 120 
      //   : isBreak ? 120 + (80 / 10000 * timeNow) : 200 - (80 / 10000 * timeNow);
      
      // hsl(200, 100%, 60%) blue
      // hsl(120, 100%, 60%) green
      
      const rads = {
        full: Math.PI * 2,
        qtr: Math.PI / 2,
        perSec: Math.PI * 2 / totalTime,
      };

      const circ = {
        x: canvas.width / 2, 
        y: canvas.height / 2,
        r: canvas.height / 2 * 0.9,
        lineW: 15,
        arc: {
          ccw1: false,
          ccw2: true,
          // clr1: isBreak ? "hsl(" + hue + ", 100%, 50%)" : "hsl(" + hue + ", 100%, 50%)",
          // clr2: isBreak ? "hsl(" + hue + ", 15%, 50%)" : "hsl(" + hue + ", 15%, 50%)",
          clr1: isBreak ? "hsl(200, 100%, 50%)" : "hsl(120, 100%, 50%)",
          clr2: "hsla(0, 0%, 0%, 0.2)",

          // clr1: isBreak ? "hsl(" + hue + ", 15%, 50%)" : "hsl(" + hue + ", 100%, 50%)",
          // clr2: isBreak ? "hsl(" + hue + ", 100%, 50%)" : "hsl(" + hue + ", 15%, 50%)",
          get start() { return rotate(0); },
          /** Break and session arcs run in opposite directions */
          // get end1() { return isBreak ? rotate((totalTime - timeNow) * rads.perSec) : rotate(timeNow * rads.perSec);},
          // 2nd arc full circle when timer runs out
          // get end2() { return !timeNow ? rotate(rads.full) : isBreak ? rotate((totalTime - timeNow) * rads.perSec) : rotate(timeNow * rads.perSec);},

          get end1() { return rotate(timeNow * rads.perSec);},
          get end2() { return !timeNow ? rotate(rads.full) : rotate(timeNow * rads.perSec);},
        },
      }

      function rotate(radians) { return radians - rads.qtr; }

      function drawArc(x, y, r, start, end, isCCW, lineW, color) {
        ctx.beginPath();
        ctx.arc(x, y, r, start, end, isCCW);
        ctx.lineWidth = lineW;
        ctx.strokeStyle = color;
        ctx.stroke();
      }

      function drawRing() {
        // Clear canvas first
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // Time expired arc
        drawArc(circ.x, circ.y, circ.r, circ.arc.start, circ.arc.end2, circ.arc.ccw2, circ.lineW, circ.arc.clr2);
        // Time remaining arc
        drawArc(circ.x, circ.y, circ.r, circ.arc.start, circ.arc.end1, circ.arc.ccw1, circ.lineW, circ.arc.clr1);
      }

      drawRing();
    };

    const animateDraw = (time = timer * 1000) => {
      
      const animationLength = 1000; // time in ms
      let startTime = -1;
      
      const doAnimation = (timestamp) => {
        let progress = 0;
        let countdown;
        
        if (startTime < 0) {
          // Set startTime as the beginning of the actual animation call
          startTime = timestamp;
        }

        // progress in ms from startTime
        progress = timestamp - startTime;
        countdown = time - progress;

        // Don't animate if countdown goes below zero
        if (countdown >= 0) draw(countdown);
        
        // Only animate if the progress (in ms) is less than 1 second.
        if (progress < animationLength) {
          this.animID = requestAnimationFrame(doAnimation);
        }
      };
  
      this.animID = requestAnimationFrame(doAnimation);
    };

    if (isRunning) {
      animateDraw();
    } else {
      cancelAnimationFrame(this.animID);
      draw();
    }
  }

  render() {
    const { size } = this.props;
    return (
      <canvas id="canvas" width={size} height={size} ref={this.canvas} />
    );
  }
}

export default TimerCanvas;