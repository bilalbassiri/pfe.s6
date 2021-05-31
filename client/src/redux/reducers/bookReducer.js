import types from "../constants/action.types";
const { SET_BOOKS, SET_CURRENT_BOOK, UPDATE_CURRENT_BOOK } = types;

const initialState = {
  all: [],
  most_rated: [],
  popular: [],
  categories: [],
  currentBook: {},
};

const bookReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_BOOKS:
      return {
        ...state,
        all: payload.all,
        most_rated: payload.most_rated,
        popular: payload.popular,
      };
    case SET_CURRENT_BOOK:
      return {
        ...state,
        currentBook: payload,
      };
    case UPDATE_CURRENT_BOOK:
      return {
        ...state,
        currentBook: {
          ...state.currentBook,
          rating: payload.rating,
          rating_count: payload.rating_count,
        },
      };
    default:
      return state;
  }
};

export default bookReducer;
