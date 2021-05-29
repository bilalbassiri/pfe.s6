import { combineReducers } from "redux";
import userReducer from "./userReducer";
import bookReducer from "./bookReducer";
import reviewReducer from "./reviewReducer";
import adminReducer from "./adminReducer";

const reducer = combineReducers({
  user: userReducer,
  books: bookReducer,
  reviews: reviewReducer,
  dashboard: adminReducer
});
export default reducer;
