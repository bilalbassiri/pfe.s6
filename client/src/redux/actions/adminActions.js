import types from "../constants/action.types";
const { SET_DASHBOARD, UPDATE_DASHBOARD_TABLE, SET_ACTIVE_USERS } = types;

const setAdminDashboard = (payload) => ({ type: SET_DASHBOARD, payload });
const updateDashboardData = (payload) => ({ type: UPDATE_DASHBOARD_TABLE, payload });
const setActiveUsers = (payload) => ({ type: SET_ACTIVE_USERS, payload });

export { setAdminDashboard, updateDashboardData, setActiveUsers };
