import React, { useEffect } from 'react';
import { MainPage, LogIn, SignUp, Header, BookDetails, Profile, Account, Cart } from './components';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { userLogin, userSetAccessToken } from './redux/actions/userActions';
import { useDispatch } from 'react-redux';
import { setBooks } from './redux/actions/bookActions';
import { getBooksFromDB, getAccessTokenAndUser } from './helpers/requests';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    getAccessTokenAndUser().then(({ data, _ACCESS_TOKEN }) => {
      dispatch(userLogin(data))
      dispatch(userSetAccessToken(_ACCESS_TOKEN))
    })
    getBooksFromDB().then(books => dispatch(setBooks(books)))
  }, [dispatch])
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={MainPage} />
          <Route path="/login" exact component={LogIn} />
          <Route path="/sign-up" exact component={SignUp} />
          <Route path="/book/:bookId" exact>
            <Header />
            <BookDetails />
          </Route>
          <Route path="/readers/:user_id" exact>
            <Header />
            <Profile />
          </Route>
          <Route path="/me/account" exact>
            <Header />
            <Account />
          </Route>
          <Route path="/me/cart" exact>
            <Header />
            <Cart />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
