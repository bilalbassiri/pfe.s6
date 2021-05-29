import types from "../constants/action.types";
const { SET_DASHBOARD } = types;

const setAdminDashboard = (payload) => ({ type: SET_DASHBOARD, payload });
export { setAdminDashboard };
