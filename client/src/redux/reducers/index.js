import { combineReducers } from "redux";
import userReducer from './userReducer';
import bookReducer from './bookReducer';

const reducers = combineReducers({
    user: userReducer,
    book: bookReducer
})
export default reducers;