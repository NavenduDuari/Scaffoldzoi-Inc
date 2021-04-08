import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Profile from '../Profile/index';
import Login from '../../Components/Login/index';

import {
  PropsI,
  ComponentStateI,
  StoreStateI,
  MapStateToPropsI,
  MapDispatchToPropsI,
} from './types';
import { performAuthAction, loadLocalTokenAction } from './action';
import { GlobalStateI } from '../../rootReducer';

const mapStateToProps = (globalState: GlobalStateI): MapStateToPropsI => {
  const state = globalState.appReducer;
  return {
    token: state.token,
  };
};

const mapDispatchToProps = (dispatch: any): MapDispatchToPropsI => ({
  loadLocalToken: () => dispatch(loadLocalTokenAction()),
  performAuth: (email: string, password: string) =>
    dispatch(performAuthAction(email, password)),
});

class App extends React.Component<PropsI, ComponentStateI> {
  constructor(props: PropsI) {
    super(props);
  }

  componentDidMount() {
    console.log('App mounted');
    this.props.loadLocalToken();
  }

  render() {
    console.log('token :: ', this.props.token);
    return (
      <Router>
        <Switch>
          <Route exact path="/profile">
            <Profile />
          </Route>
          <Route
            exact
            path="/login"
            render={(routeProps) => (
              <div>
                <div onClick={() => routeProps.history.push('/profile')}>
                  this is app
                </div>

                <Login performAuth={this.props.performAuth} />
              </div>
            )}
          />
          <Route
            exact
            path="/"
            render={(routeProps) => (
              <div onClick={() => routeProps.history.push('/profile')}>
                this is app
              </div>
            )}
          />
        </Switch>
      </Router>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
