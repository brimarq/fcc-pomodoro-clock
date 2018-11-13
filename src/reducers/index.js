import { SET_BREAK_LENGTH, SET_SESSION_LENGTH, SET_IS_RUNNING, RESET_TIMER, TOGGLE_TIMER, TICK_TIMER} from "../constants/action-types";

/**** REDUCERS ****/

const initState = {
  // TESTING VALUES //
  breakLength: 1,
  sessionLength: 1,
  timer: 1 * 60,
  /* breakLength: 5,
  sessionLength: 25,
  timer: 25 * 60, */
  isBreak: false,
  isRunning: false,
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case SET_BREAK_LENGTH:
      return {
        ...state,
        breakLength: action.breakLength,
        timer: state.isBreak ? action.breakLength * 60 : state.timer
      };
    case SET_SESSION_LENGTH:
      return {
        ...state,
        sessionLength: action.sessionLength,
        timer: state.isBreak ? state.timer : action.sessionLength * 60
      };
    case SET_IS_RUNNING:
      return {
        ...state,
        isRunning: action.isRunning
      };
    case TICK_TIMER:
      return {
        ...state,
        timer: action.timer
      };
    case TOGGLE_TIMER:
      return {
        ...state,
        isBreak: !state.isBreak,
        timer: state.isBreak ? state.sessionLength * 60 : state.breakLength * 60
      };
    case RESET_TIMER:
      return {
        ...initState
      };

    default:
      return state;
  }
};

export default reducer;