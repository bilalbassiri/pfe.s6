import types from "../constants/action.types";
const {
  SET_BOOKS,
  SET_CURRENT_BOOK,
  UPDATE_CURRENT_BOOK,
  SET_BOOKS_LOADING,
  SET_SEARCH_RESULT,
} = types;

const initialState = {
  all: [],
  most_rated: [],
  popular: [],
  currentBook: {},
  searchResult: null,
  loading: true,
};

const bookReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_BOOKS_LOADING:
      return {
        ...state,
        loading: true,
      };
    case SET_BOOKS:
      return {
        ...state,
        all: payload.all,
        most_rated: payload.most_rated,
        popular: payload.popular,
        loading: false,
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
    case SET_SEARCH_RESULT:
      return {
        ...state,
        searchResult: payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default bookReducer;
