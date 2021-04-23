import { combineReducers } from "redux";
import visitorReducer from './visitorReducer';

const reducers = combineReducers({
    user: visitorReducer
})
export default reducers;