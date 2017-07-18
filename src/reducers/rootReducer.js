// THis is our master reducer... the root reducer.
// The reducers hold pieces of state. The root reducer holds all the reducers.
// I.e., the rootreducer holds ALL peices of state, or application state.

// We need to get the combineReducers method from redux, to make a rootReducer
// that the Provider can use.
import { combineReducers } from 'redux';

// Import each reducer here.
// First: import the STudentReducer
// import StudentReducer from './StudentReducer';
// Import the register reducer which contains {msg, token}
import RegisterReducer from './RegisterReducer';
// create a rootReducer using the combineReducer method, so we can export it
// to the Store in index.js
import CartReducer from './CartReducer';
const rootReducer = combineReducers({
	// Inside here, we pass each reducer as a key/value
	// Each key will be available as a peice of state later
	registerReducer: RegisterReducer,
	cartReducer: CartReducer
})

export default rootReducer;