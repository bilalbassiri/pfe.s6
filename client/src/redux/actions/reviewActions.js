import types from "../constants/action.types";
const { GET_REVIEWS, ADD_NEW_REVIEW, REMOVE_REVIEW, SET_REVIEWS_LOADING } =
  types;

const getReviews = (payload) => ({ type: GET_REVIEWS, payload });
const setReview = (payload) => ({ type: ADD_NEW_REVIEW, payload });
const removeReview = (payload) => ({ type: REMOVE_REVIEW, payload });
const setReviewsLoading = () => ({ type: SET_REVIEWS_LOADING });

export { getReviews, setReview, removeReview, setReviewsLoading };
