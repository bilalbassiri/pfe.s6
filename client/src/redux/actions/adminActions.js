import types from "../constants/action.types";
const {
  SET_DASHBOARD,
  UPDATE_DASHBOARD_TABLE,
  SET_ACTIVE_USERS,
  UPDATE_BOOK,
  ADD_NEW_BOOK,
  UPDATE_ORDER_STATE,
  DELETE_ORDER,
  DELETE_ALL_REVIEWS,
  READ_MAIL,
  DELETE_USERS,
} = types;

const setAdminDashboard = (payload) => ({ type: SET_DASHBOARD, payload });
const updateDashboardData = (payload) => ({
  type: UPDATE_DASHBOARD_TABLE,
  payload,
});
const setActiveUsers = (payload) => ({ type: SET_ACTIVE_USERS, payload });
const setUpdatedBook = (payload) => ({ type: UPDATE_BOOK, payload });
const setNewBook = (payload) => ({ type: ADD_NEW_BOOK, payload });
const setNewOrderState = (payload) => ({ type: UPDATE_ORDER_STATE, payload });
const deleteOrder = (payload) => ({ type: DELETE_ORDER, payload });
const deleteAllReviews = () => ({ type: DELETE_ALL_REVIEWS });
const readMessage = (payload) => ({ type: READ_MAIL, payload });
const deleteUsers = (payload) => ({ type: DELETE_USERS, payload });
export {
  setAdminDashboard,
  updateDashboardData,
  setActiveUsers,
  setUpdatedBook,
  setNewBook,
  setNewOrderState,
  deleteOrder,
  deleteAllReviews,
  readMessage,
  deleteUsers
};
