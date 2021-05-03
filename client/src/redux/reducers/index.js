import { combineReducers } from "redux";
import userReducer from './userReducer';
import bookReducer from './bookReducer';
import reviewReducer from './reviewReducer';

const reducer = combineReducers({
    user: userReducer,
    book: bookReducer,
    reviews: reviewReducer,
})
export default reducer;