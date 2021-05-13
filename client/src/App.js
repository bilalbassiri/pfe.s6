import React, { useEffect, useState } from 'react';
import { Home, LogIn, SignUp, Header, Book, Profile, Account, Cart, Favoris, Genre } from './components';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { userLogin, userSetAccessToken } from './redux/actions/userActions';
import { useDispatch } from 'react-redux';
import { setBooks } from './redux/actions/bookActions';
import { getBooksFromDB, getAccessTokenAndUser, getCategory } from './helpers/axios.helpers';

function App() {
  const dispatch = useDispatch();
  const [genres, setGenres] = useState(null)
  const [permission, setPermission] = useState(true)
  useEffect(() => {
    getAccessTokenAndUser().then(({ data, _ACCESS_TOKEN }) => {
      setGenres(data.genres)
      dispatch(userLogin(data))
      dispatch(userSetAccessToken(_ACCESS_TOKEN))
    })
  }, [])
  useEffect(() => {
    (
      async () => {
        if (permission && genres) {
          const books = await getBooksFromDB();
          const categories = await Promise.all(genres.map(async genre => ({ genre, books: await getCategory(genre) })));
          dispatch(setBooks({ ...books, categories }))
          setPermission(false)
        }
      }
    )()
  }, [dispatch, permission, genres])
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" exact component={LogIn} />
          <Route path="/sign-up" exact component={SignUp} />
          <Route path="/book/:bookId" exact>
            <Header />
            <Book />
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
          <Route path="/me/favoris" exact>
            <Header />
            <Favoris />
          </Route>
          <Route path="/genres/:genre" exact>
            <Header />
            <Genre />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
