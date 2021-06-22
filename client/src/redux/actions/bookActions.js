import types from "../constants/action.types";
const {
  SET_BOOKS,
  SET_CURRENT_BOOK,
  UPDATE_CURRENT_BOOK,
  SET_BOOKS_LOADING,
  SET_SEARCH_RESULT,
} = types;

const setBooks = (books) => ({ type: SET_BOOKS, payload: books });
const setCurrentBook = (book) => ({ type: SET_CURRENT_BOOK, payload: book });
const updateCurrentBook = (book) => ({
  type: UPDATE_CURRENT_BOOK,
  payload: book,
});
const setBooksStartLoading = () => ({ type: SET_BOOKS_LOADING });
const setSearchResultBooks = (payload) => ({
  type: SET_SEARCH_RESULT,
  payload,
});
export {
  setBooks,
  setCurrentBook,
  updateCurrentBook,
  setBooksStartLoading,
  setSearchResultBooks,
};
