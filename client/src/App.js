import React, { useEffect } from "react";
import {
  Home,
  LogIn,
  SignUp,
  Header,
  Book,
  Profile,
  Account,
  Cart,
  Favoris,
  Genre,
  Admin,
  ContactUs,
  Search,
  NotFound,
  ResetPassword,
  NewPassword,
} from "./components";
import { Route, Switch, useHistory } from "react-router-dom";
import {
  userLogin,
  userLogout,
  userSetAccessToken,
} from "./redux/actions/userActions";
import { useDispatch } from "react-redux";
import {
  getAccessTokenAndUser,
  getBooksFromDB,
  getDashboardData,
} from "./helpers/axios.helpers";
import axios from "axios";
import { setAdminDashboard } from "./redux/actions/adminActions";
import { setBooks } from "./redux/actions/bookActions";

function App() {
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    getAccessTokenAndUser().then(({ data, _ACCESS_TOKEN }) => {
      if (data.hasOwnProperty("active")) {
        if (data.active) {
          dispatch(userSetAccessToken(_ACCESS_TOKEN));
          dispatch(userLogin(data));
          if (data.role === 1) {
            getDashboardData(_ACCESS_TOKEN).then((data) =>
              dispatch(setAdminDashboard(data))
            );
          }
        } else {
          axios
            .get("https://powerful-cove-30608.herokuapp.com/user/logout")
            .then(() => {
              dispatch(userLogout());
              history.push("/login");
              console.log(1);
            });
        }
      } else {
        dispatch(userLogin({}));
      }
    });
    if (!(window.location.pathname === "/")) {
      getBooksFromDB().then((books) => dispatch(setBooks(books)));
    }
  }, [dispatch, history]);
  return (
    <div className="App">
      <Switch>
        <Route path="/login" exact component={LogIn} />
        <Route path="/reset-password" exact component={ResetPassword} />
        <Route
          path="/change-password/:userId/:token"
          exact
          component={NewPassword}
        />
        <Route path="/sign-up" exact component={SignUp} />
        <Route>
          <Header />
          <div className="index">
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/book/:bookId" exact component={Book} />
              <Route path="/readers/:username" exact component={Profile} />
              <Route path="/me/account" exact component={Account} />
              <Route path="/me/cart" exact component={Cart} />
              <Route path="/me/favoris" exact component={Favoris} />
              <Route path="/genres/:genre" exact component={Genre} />
              <Route path="/contact-us" exact component={ContactUs} />
              <Route path="/search" exact component={Search} />
              <Route path="/admin" component={Admin} />
              <Route path="*" component={NotFound} />
            </Switch>
          </div>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
