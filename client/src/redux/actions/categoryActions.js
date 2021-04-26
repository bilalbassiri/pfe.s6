import actionTypes from '../contants/action.types';
const { SET_CATEGORIES } = actionTypes;

const setCategories = categories => {
    return { type: SET_CATEGORIES, payload: categories }
}
export {
    setCategories
}