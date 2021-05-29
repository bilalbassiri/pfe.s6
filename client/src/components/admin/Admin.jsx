import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { CircularProgress } from "..";
import { getDashboardData } from "../../helpers/axios.helpers";
import { setAdminDashboard } from "../../redux/actions/adminActions";
import { Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import Users from "./Users";

const Admin = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [dashboardIsLoding, setDashboardIsLoading] = useState(true);
  const {
    user: { accessToken, credentials },
  } = useSelector((state) => state);
  useEffect(() => {
    if (!accessToken) return;
    if (credentials?.role === 0) {
      history.push("/");
      return;
    } else {
      getDashboardData(accessToken).then((data) => {
        dispatch(setAdminDashboard(data));
        setDashboardIsLoading(false);
      });
    }
  }, [accessToken, dispatch, credentials, history]);
  return !dashboardIsLoding ? (
    <>
      <Route path="/admin/dashboard" exact component={Dashboard} />
      <Route path="/admin/dashboard/users" exact component={Users} />
    </>
  ) : (
    <CircularProgress plan={{ h: "calc(100vh - 84px)", w: "100%" }} />
  );
};
export default Admin;
