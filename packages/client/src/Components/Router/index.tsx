import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
/* import Home from '../Home'; */

export default function BasicExample() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <div> This is TEST </div>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
