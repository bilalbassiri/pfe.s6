import React from 'react';
import { MainPage, LogIn, SignUp } from './components';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  const new_user = useSelector(({ user }) => user?.new_user)
  console.log(new_user)
  console.log(new_user)
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
