import React, { useEffect } from 'react';
import { MainPage, LogIn, SignUp } from './components';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { userLogin, userSetAccessToken } from './redux/actions/userActions';
import { useDispatch } from 'react-redux';
import axios from 'axios';

function App() {
  const dispatch = useDispatch();
  const getAccessTokenAndUser = async () => {
    try {
      const { data: { _ACCESS_TOKEN } } = await axios({
        method: 'get',
        url: '/user/refresh_token',
      });
      const { data } = await axios({
        method: 'get',
        url: '/user/info',
        headers: {
          authorization: _ACCESS_TOKEN,
        }
      })
      dispatch(userLogin(data))
      dispatch(userSetAccessToken(_ACCESS_TOKEN))
    } catch (err) {
      console.log(err.message)
    }
  }
  useEffect(() => {
    getAccessTokenAndUser()
  }, [])
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={MainPage} />
          <Route path="/login" component={LogIn} />
          <Route path="/sign-up" component={SignUp} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
