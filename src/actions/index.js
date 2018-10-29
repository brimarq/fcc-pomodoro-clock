import { SET_BREAK_LENGTH, SET_SESSION_LENGTH, SET_IS_RUNNING, RESET_TIMER, TOGGLE_TIMER, TICK_TIMER} from "../constants/action-types";

/**** ACTION CREATORS ****/
export const setBreakLength = (length) => ({
  type: SET_BREAK_LENGTH,
  breakLength: length
});

export const setSessionLength = (length) => ({
  type: SET_SESSION_LENGTH,
  sessionLength: length
});

// export const setTimer = (time) => ({
//   type: SET_TIMER,
//   timer: time
// });

export const resetTimer = () => ({
  type: RESET_TIMER
});

// export const setIsBreak = (bool) => ({
//   type: SET_IS_BREAK,
//   isBreak: bool
// });

export const setIsRunning = (bool) => ({
  type: SET_IS_RUNNING,
  isRunning: bool
});

export const toggleTimer = () => ({
  type: TOGGLE_TIMER,
});

export const tickTimer = (time) => ({
  type: TICK_TIMER,
  timer: time
});