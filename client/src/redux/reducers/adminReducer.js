import types from "../constants/action.types";
const {
  SET_DASHBOARD,
  UPDATE_DASHBOARD_TABLE,
  SET_ACTIVE_USERS,
  UPDATE_BOOK,
  ADD_NEW_BOOK,
} = types;
const initialState = {
  users: [],
  books: [],
  reviews: [],
  orders: [],
  sales: [],
  isLoading: true,
};

const adminReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_DASHBOARD:
      return payload;
    case UPDATE_DASHBOARD_TABLE:
      return {
        ...state,
        [payload.prop]: payload.data,
      };
    case SET_ACTIVE_USERS:
      return {
        ...state,
        users: state.users.map((user) => {
          if (payload.data.includes(user._id))
            return { ...user, active: payload.active };
          else return user;
        }),
      };
    case UPDATE_BOOK:
      return {
        ...state,
        books: state.books.map((book) => {
          if (book._id === payload._id) return payload;
          else return book;
        }),
      };
    case ADD_NEW_BOOK:
      return {
        ...state,
        books: [payload, ...state.books],
      };
    default:
      return state;
  }
};
export default adminReducer;
