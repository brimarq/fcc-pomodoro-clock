import { SET_BREAK_LENGTH, SET_SESSION_LENGTH, SET_IS_RUNNING, RESET_TIMER, TOGGLE_TIMER, TICK_TIMER} from "../constants/action-types";

/**** REDUCERS ****/

const initState = {
  breakLength: 5 * 60000,
  sessionLength: 25 * 60000,
  isBreak: false,
  isRunning: false,
  timer: 25 * 60000, 
  _isOn: false,
  _time: 0
};

export default function reducer(state = initState, action) {
  switch (action.type) {
    case SET_BREAK_LENGTH:
      return {
        ...state,
        breakLength: action.breakLength,
        timer: state.isBreak ? action.breakLength : state.timer
      };
    case SET_SESSION_LENGTH:
      return {
        ...state,
        sessionLength: action.sessionLength,
        timer: state.isBreak ? state.timer : action.sessionLength
      };
    case SET_IS_RUNNING:
      return {
        ...state,
        isRunning: action.isRunning
      };
    case TICK_TIMER:
      return {
        ...state,
        timer: action.timer,
      };
    // case TICK_TIMER:
    //   return {
    //     ...state,
    //     timer: action.timer < 0 ? state.isBreak ? state.sessionLength : state.breakLength : action.timer,
    //     isBreak: action.timer < 0 ? !state.isBreak : state.isBreak
    //   };

    case TOGGLE_TIMER:
      return {
        ...state,
        isBreak: !state.isBreak,
        timer: state.isBreak ? state.sessionLength : state.breakLength
      };
    case RESET_TIMER:
      return {
        ...initState
      };

    default:
      return state;
  }
};