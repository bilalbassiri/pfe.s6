import types from "../constants/action.types";
const { SET_DASHBOARD } = types;
const initialState = {
  users: [],
  books: [],
  reviews: [],
  orders: [],
  sales: [],
};

const adminReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_DASHBOARD:
      return payload;
    default:
      return state;
  }
};
export default adminReducer;
