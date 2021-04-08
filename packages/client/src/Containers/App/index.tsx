import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Profile from '../Profile';
import Login from '../../Components/Login';

import {
  PropsI,
  ComponentStateI,
  StoreStateI,
  MapStateToPropsI,
  MapDispatchToPropsI,
} from './types';
import { performAuthAction } from './action';

class App extends React.Component<PropsI, ComponentStateI> {
  constructor(props: PropsI) {
    super(props);
  }

  componentDidMount() {
    console.log('App mounted');
  }

  render() {
    return (
      <Switch>
        <Route exact path="/profile">
          <Profile />
        </Route>
        <Route exact path="/login">
          <Login performAuth={this.props.performAuth} />
        </Route>
      </Switch>
    );
  }
}

const mapStateToProps = (state: StoreStateI): MapStateToPropsI => ({});

const mapDispatchToProps = (dispatch: any): MapDispatchToPropsI => ({
  performAuth: (email: string, password: string) =>
    dispatch(performAuthAction(email, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
