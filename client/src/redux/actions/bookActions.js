import types from '../constants/action.types';
const { SET_BOOKS } = types;

const setBooks = books => {
    return { type: SET_BOOKS, payload: books }
}

export {
    setBooks,
}