import { combineReducers } from "redux";
import userReducer from './userReducer';
import categoryReducer from './categoryReducer';

const reducers = combineReducers({
    user: userReducer,
    category: categoryReducer
})
export default reducers;