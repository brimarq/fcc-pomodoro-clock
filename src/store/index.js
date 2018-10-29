import { createStore } from 'redux';
import reducer from '../reducers';

/**** STORE ****/
const store = createStore(
  reducer, 
  typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() // Redux dev tools
  );

export default store;