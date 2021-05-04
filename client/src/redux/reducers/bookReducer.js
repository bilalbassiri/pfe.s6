import types from '../constants/action.types';
const { SET_BOOKS, SET_CURRENT_BOOK, UPDATE_CURRENT_BOOK } = types;

const bookReducer = (state = { allbooks: null, currentBook: null }, { type, payload }) => {
    switch (type) {
        case SET_BOOKS:
            return {
                ...state,
                allbooks: payload
            };
        case SET_CURRENT_BOOK:
            return {
                ...state,
                currentBook: payload
            };
            case UPDATE_CURRENT_BOOK: 
            return {
                ...state,
                currentBook:{
                    ...state.currentBook,
                    rating: payload.rating,
                    rating_count: payload.rating_count
                }
            }
        default:
            return state;
    }
}

export default bookReducer;