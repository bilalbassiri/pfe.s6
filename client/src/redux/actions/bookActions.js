import types from '../constants/action.types';
const { SET_BOOKS, SET_CURRENT_BOOK, UPDATE_CURRENT_BOOK } = types;

const setBooks = books => ({ type: SET_BOOKS, payload: books })
const setCurrentBook = book => ({ type: SET_CURRENT_BOOK, payload: book })
const updateCurrentBook = book => ({ type: UPDATE_CURRENT_BOOK, payload: book })
export {
    setBooks,
    setCurrentBook,
    updateCurrentBook,
}