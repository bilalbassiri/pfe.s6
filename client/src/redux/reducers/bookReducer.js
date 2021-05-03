import types from '../constants/action.types';
const { SET_BOOKS } = types;

const bookReducer = (state = { allbooks: null }, { type, payload }) => {
    switch (type) {
        case SET_BOOKS:
            return {
                allbooks: payload
            };
        default:
            return state;
    }
}

export default bookReducer;