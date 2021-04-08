import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Profile from '../../Containers/Profile';
import Login from '../Login';

export default function router() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/profile">
            <Profile />
          </Route>
          <Route exact path="/login">
            <Login performAuth={} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
