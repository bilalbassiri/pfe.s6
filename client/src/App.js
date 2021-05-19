import React, { useEffect, useState } from 'react';
import { Home, LogIn, SignUp, Header, Book, Profile, Account, Cart, Favoris, Genre } from './components';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { userLogin, userSetAccessToken } from './redux/actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import { setBooks } from './redux/actions/bookActions';
import { getBooksFromDB, getAccessTokenAndUser } from './helpers/axios.helpers';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    getAccessTokenAndUser().then(({ data, _ACCESS_TOKEN }) => {
      dispatch(userLogin(data))
      dispatch(userSetAccessToken(_ACCESS_TOKEN))
      getBooksFromDB().then(books => dispatch(setBooks(books)))
    })
  }, [dispatch])
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
              <Route path="/book/:bookId" exact>
                <Book />
              </Route>
              <Route path="/readers/:user_id" exact>
                <Profile />
              </Route>
              <Route path="/me/account" exact>
                <Account />
              </Route>
              <Route path="/me/cart" exact>
                <Cart />
              </Route>
              <Route path="/me/favoris" exact>
                <Favoris />
              </Route>
              <Route path="/genres/:genre" exact>
                <Genre />
              </Route>
            </div>

          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
