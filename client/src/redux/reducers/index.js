import { combineReducers } from "redux";
import userReducer from './userReducer';
import bookReducer from './bookReducer';
import reviewReducer from './reviewReducer';

const reducer = combineReducers({
    user: userReducer,
    books: bookReducer,
    reviews: reviewReducer,
})
export default reducer;