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
          if (!(window.location.pathname === "/")) {
            getBooksFromDB().then((books) => dispatch(setBooks(books)));
          }
          if (data.role) {
            getDashboardData(_ACCESS_TOKEN).then((data) =>
              dispatch(setAdminDashboard(data))
            );
          }
        } else {
          axios.get("/user/logout").then(() => {
            dispatch(userLogout());
            history.push("/login");
            console.log(1);
          });
        }
      }
    });
  }, [dispatch, history]);
  return (
    <div className="App">
      <Switch>
        <Route path="/login" exact component={LogIn} />
        <Route path="/sign-up" exact component={SignUp} />
        <Route>
          <Header />
          <div className="index">
            <Route path="/" exact component={Home} />
            <Route path="/book/:bookId" exact component={Book} />
            <Route path="/readers/:user_id" exact component={Profile} />
            <Route path="/me/account" exact component={Account} />
            <Route path="/me/cart" exact component={Cart} />
            <Route path="/me/favoris" exact component={Favoris} />
            <Route path="/genres/:genre" exact component={Genre} />
            <Route path="/admin" component={Admin} />
          </div>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
