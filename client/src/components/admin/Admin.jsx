import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { CircularProgress } from "..";
import { Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import Users from "./Users";
import Orders from "./Orders";
import Books from "./Books";
import Sales from "./Sales";
import Messages from "./Messages";
import Reviews from "./Reviews";
import AddNewBook from "./AddNewBook";

const Admin = () => {
  const history = useHistory();
  const {
    dashboard: { isLoading },
    user: { credentials },
  } = useSelector((state) => state);
  useEffect(() => {
    if (!isLoading && !credentials?.role) {
      history.push("/");
    }
  }, [credentials, history, isLoading]);
  return !isLoading ? (
    <>
      <Route path="/admin/dashboard/users" component={Users} />
      <Route path="/admin/dashboard/books" component={Books} />
      <Route path="/admin/dashboard/reviews" component={Reviews} />
      <Route path="/admin/dashboard/orders" component={Orders} />
      <Route path="/admin/dashboard/messages" component={Messages} />
      <Route path="/admin/dashboard/sales" component={Sales} />
      <Route path="/admin/dashboard" exact component={Dashboard} />
      <Route
        path="/admin/dashboard/books/add-new-book"
        component={AddNewBook}
      />
    </>
  ) : (
    <CircularProgress plan={{ h: "calc(100vh - 84px)", w: "100%" }} />
  );
};
export default Admin;
