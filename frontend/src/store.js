import {createStore} from "redux";

import mainReducer from './reducers/mainReducer'

// here initial state was not passed in createStore function because reducer already initialised in the reducer file. If no then we can pass initial state as 2nd parameter
// window..... is for chrome extension (thats not mandatory)

const store = createStore(mainReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;
