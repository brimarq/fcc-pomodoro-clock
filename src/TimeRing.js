import React, { Component } from 'react';
// import store from "./store";
import "./TimeRing.css";

class TimeRing extends Component {
  constructor(props) {
    super(props);
    this.canvas = React.createRef();
    this.beep = React.createRef();
    this.drawRing = this.drawRing.bind(this);
    this.playBeep = this.playBeep.bind(this);
  }

  componentDidMount() {
    this.drawRing(this.props.msLeft);
  }

  componentDidUpdate() {
    this.drawRing(this.props.msLeft);
    this.playBeep();
  }

  playBeep() {
    if (!this.props.msLeft) this.beep.current.play();
  }

  drawRing(time) {
    const canvas = this.canvas.current;
    const ctx = canvas.getContext("2d");
    const msTotal = this.props.msTotal;
    

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
        timeLeft: Math.PI * 2 / msTotal * time,
        secHand: Math.PI * 2 / 60000 * (time % 60000)
      },
      color: "hsl(" + (130 / msTotal * time) + ", 100%, 50%)",
      rotate: function(radians) { return radians - this.rads.qtrCircle; },
      get start() {return this.rotate(0);},
      get end() {return !time ? this.rotate(this.rads.fullCircle) : this.rotate(this.rads.timeLeft);}, 
      get endSecHand() {return !this.rads.secHand ? this.rotate(this.rads.fullCircle) : this.rotate(this.rads.secHand);},
    };

    const drawArc = (x, y, r, start, end, isCCW, lineW, color) => {
      ctx.beginPath();
      ctx.arc(x, y, r, start, end, isCCW);
      ctx.lineWidth = lineW;
      ctx.strokeStyle = color;
      ctx.stroke();
    };

    // const drawText = (text) => {
    //   ctx.font = '2em Arial, Helvetica, sans-serif';
    //   ctx.textAlign = 'center';
    //   ctx.textBaseline = 'middle';
    //   ctx.fillText(text, arc.x, arc.y);
    // };

    // Clear canvas first
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Time expired arc (total time)
    drawArc(arc.x, arc.y, arc.r, arc.start, arc.end, true, 20, "#bbb");
    // Time remaining arc (total time)
    drawArc(arc.x, arc.y, arc.r, arc.start, arc.end, false, 20, arc.color);

    // Time expired arc (ms/min)
    drawArc(arc.x, arc.y, arc.r * 0.75, arc.start, arc.endSecHand, true, 20, "#bbb");
    // Time remaining arc (ms/min)
    drawArc(arc.x, arc.y, arc.r * 0.75, arc.start, arc.endSecHand, false, 20, "orange");

    // drawText(this.state.timeLeft);
  };

  render() {
    return (
      <div id="time-ring">
        <canvas id="canvas" width="200" height="200" style={{border: "1px solid #d3d3d3", backgroundColor: "rgba(0, 0, 0, 0)"}} ref={this.canvas}></canvas>
        <audio id="beep" src="https://freesound.org/data/previews/250/250629_4486188-lq.mp3" type="audio/mpeg" ref={this.beep}></audio>
      </div>
    );
  }
}



export default TimeRing;