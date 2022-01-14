import { combineReducers, createStore } from 'redux';
import userReducer from '../reducers/userReducer';
import loginReducer from '../reducers/loginReducer';

const reduxDevtools =
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__();

const reducer = combineReducers({
    user: userReducer,
    login: loginReducer,
});

export const store = createStore(reducer, reduxDevtools);
