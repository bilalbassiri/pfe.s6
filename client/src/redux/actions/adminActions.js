import types from "../constants/action.types";
const {
  SET_DASHBOARD,
  UPDATE_DASHBOARD_TABLE,
  SET_ACTIVE_USERS,
  UPDATE_BOOK,
  ADD_NEW_BOOK,
} = types;

const setAdminDashboard = (payload) => ({ type: SET_DASHBOARD, payload });
const updateDashboardData = (payload) => ({
  type: UPDATE_DASHBOARD_TABLE,
  payload,
});
const setActiveUsers = (payload) => ({ type: SET_ACTIVE_USERS, payload });
const setUpdatedBook = (payload) => ({ type: UPDATE_BOOK, payload });
const setNewBook = (payload) => ({ type: ADD_NEW_BOOK, payload });

export {
  setAdminDashboard,
  updateDashboardData,
  setActiveUsers,
  setUpdatedBook,
  setNewBook,
};
