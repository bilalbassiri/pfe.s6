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
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { userLogin, userSetAccessToken } from "./redux/actions/userActions";
import { useDispatch } from "react-redux";
import { setBooks } from "./redux/actions/bookActions";
import { getBooksFromDB, getAccessTokenAndUser } from "./helpers/axios.helpers";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    getAccessTokenAndUser().then(({ data, _ACCESS_TOKEN }) => {
      dispatch(userLogin(data));
      dispatch(userSetAccessToken(_ACCESS_TOKEN));
      getBooksFromDB().then((books) => dispatch(setBooks(books)));
    });
  }, [dispatch]);
  return (
    <div className="App">
      <Router>
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
      </Router>
    </div>
  );
}

export default App;
