import actionTypes from '../contants/action.types';
const { SET_BOOKS } = actionTypes;

const setBooks = books => {
    return { type: SET_BOOKS, payload: books }
}
export {
    setBooks
}