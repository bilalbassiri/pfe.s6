import actionTypes from '../contants/action.types';
const initialState = null

const bookReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case actionTypes.SET_BOOKS:
            return {
                allbooks: payload
            };
        default:
            return state;
    }
}

export default bookReducer;