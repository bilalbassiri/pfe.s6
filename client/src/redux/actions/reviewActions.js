import types from "../constants/action.types";
const { GET_REVIEWS, ADD_NEW_REVIEW, REMOVE_REVIEW } = types;

const getReviews = (payload) => ({ type: GET_REVIEWS, payload });
const setReview = (payload) => ({ type: ADD_NEW_REVIEW, payload });
const removeReview = (payload) => ({ type: REMOVE_REVIEW, payload });

export { getReviews, setReview, removeReview };
